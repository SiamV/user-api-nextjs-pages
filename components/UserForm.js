//need refactor 2 for in 1

import { useState, useEffect } from "react"
import axios from "axios"

const UserForm = (props) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState(true)

    useEffect(() => {
        setStatus(props.status)

    }, [props.status]);

    console.log(status)

    const addUser = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/api/users`, {
                name: name,
                email: email,
                password: password,
                register_date: new Date().toLocaleDateString()
            })
            response.status === 200 ? console.log("good") : console.log("something wrong")
        } catch (e) {
            console.log(e)
        }
    }

    const updateUser = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/api/users`, {
                name: name,
                email: email,
                password: password,
                register_date: new Date().toLocaleDateString()
            })
            response.status === 200 ? console.log("good") : console.log("something wrong")
        } catch (e) {
            console.log(e)
        }
    }


    return <>
        {/* <Navbar /> */}
        {props.status ? <div>Заполните поля</div>
            : <div>Исправьте данные пользователя</div>}

        <form>
            <div>
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" required
                    onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="email">Email: </label>
                <input type="email" id="email" required
                    onChange={(e) => setEmail(e.target.value)} />
            </div>

            {props.status ?
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" required
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                : <div></div>}

            {props.status ?
                <button type="button" onClick={() => { addUser() }}>add new user</button>
                : <button type="button" onClick={() => { updateUser() }}>update</button>}
        </form>
    </>
}

export default UserForm
