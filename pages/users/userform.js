import { useState } from "react"
import Navbar from "../../components/Navbar"
import axios from "axios"
import { useRouter } from 'next/router'
import Link from "next/link"
import Preloader from "../../components/common/Preloader"
import classes from "../../styles/users.module.css"
import {API_URL} from "../../config/index"

const UserForm = () => {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [reqStatus, setReqStatus] = useState(false)

    const addUser = async () => {
        try {
            const response = await axios.post(`${API_URL}/api/users`, {
                name: name,
                email: email,
                password: password,
                register_date: new Date().toLocaleDateString()
            })
            response.status === 200 ? console.log("POST req is good") || setReqStatus(false) : console.log("something wrong")
        } catch (e) {
            console.log(e)
        }
    }

    return <>
        <Navbar />
        <div className={classes.usersWrapper}>
            <div>Заполните поля</div>
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

                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" required
                        onChange={(e) => setPassword(e.target.value)} />
                </div>

                <Link href={"/users"} >
                    {!reqStatus ?
                        <button type="button" className={classes.MenuButton}
                        onClick={() => { addUser(), setReqStatus(true) }}>add new user
                        </button>
                        : <Preloader />}


                </Link>
            </form>
        </div>
    </>
}

export default UserForm
