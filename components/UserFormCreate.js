import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"
import classes from "../styles/users.module.css"
import Preloader from "../components/common/Preloader"
import { API_URL } from "../config/index"

const UserFormCreate = (props) => {
    const [name, setName] = useState(props.userUpdate.name)
    const [email, setEmail] = useState(props.userUpdate.email)
    const [password, setPassword] = useState("")
    const [responseStatus, setResponseStatus] = useState(false)

    // useEffect(() => {
    //     setName(props.userUpdate.name)

    // }, []);
    console.log(props.userUpdate, props.userUpdate.name)

    const addUserinDB = async () => {
        try {
            const response = await axios.post(`${API_URL}/api/users`, {
                name: name,
                email: email,
                password: password,
                register_date: new Date().toLocaleDateString()
            })
            response.status === 200 ? console.log("good") || setResponseStatus(false) : console.log("something wrong")
        } catch (e) {
            console.log(e)
        }
    }


    const updateUserInDB = async () => {
        try {
            const response = await axios.put(`${API_URL}/api/users/${props.userUpdate._id}`, {
                name: name,
                email: email
            })
            response.status === 200 ? console.log("PUT req is good") || setResponseStatus(false) : console.log("something wrong")
        } catch (e) {
            console.log(e)
        }
    }


    return <>
        {props.statusForm ? <div>Заполните поля</div>
            : <div>Исправьте данные пользователя</div>}

        <form>
            <div>
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" required
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="email">Email: </label>
                <input type="email" id="email" required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
            </div>

            {props.statusForm ?
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                : <div></div>}

            {props.statusForm ?
                <Link href={"/users"} >
                    {!responseStatus ? <button type="button" className={classes.MenuButton}
                        onClick={() => { addUserinDB(), setResponseStatus(true) }}>add new user</button> : <Preloader />}
                </Link>
                : <Link href={"/users"} >
                    {!responseStatus ? <button type="button" className={classes.MenuButton}
                        onClick={() => { updateUserInDB(), setResponseStatus(true) }}>update</button> : <Preloader />}
                </Link>
            }
        </form>
    </>
}

export default UserFormCreate
