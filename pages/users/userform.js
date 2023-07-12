import { useState } from "react"
import Navbar from "../../components/Navbar"
import axios from "axios"
// import { useRouter } from 'next/router'
import Link from "next/link"
import Preloader from "../../components/common/Preloader"
import classes from "../../styles/users.module.css"
import { API_URL } from "../../config/index"

const UserFormCreate = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [responseStatus, setResponseStatus] = useState(false)

    const addNewUserToDB = async () => {
        try {
            const createNewUser = await axios.post(`${API_URL}/api/users`, {
                name: name,
                email: email,
                password: password,
                register_date: new Date().toLocaleDateString()
            })
            createNewUser.status === 200 ? console.log("POST req is good") || setResponseStatus(false) : console.log("something wrong")
        } catch (e) {
            console.log(e)
        }
    }

    return <>
        <div className={classes.usersWrapper}>
            <div>Заполните поля</div>
            <form onSubmit={addNewUserToDB}>
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

                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" required
                        onChange={(e) => setPassword(e.target.value)} />
                </div>


                {!responseStatus ?
                    <Link href={"/users"} >
                        <button type="submit" className={classes.MenuButton}>
                            {/* onClick={() => { addNewUserToDB(), setResponseStatus(true) }} */}
                            add new user
                        </button>
                    </Link>
                    : <Preloader />
                }
            </form>
        </div>
    </>
}

export default UserFormCreate
