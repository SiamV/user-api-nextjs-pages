import { useState, useEffect } from "react"
import Navbar from "../../components/Navbar"
import axios from "axios"
import { useRouter } from 'next/router'
import Link from "next/link"
import Preloader from "../../components/common/Preloader"
import classes from "../../styles/users.module.css"
import {API_URL} from "../../config/index"

const UserForm = () => {
    const router = useRouter()
    const [name, setName] = useState(`${router.query.name}`)
    const [email, setEmail] = useState(`${router.query.email}`)
    const [reqStatus, setReqStatus] = useState(false)


    const id = router.query.id

    const updateUser = async () => {
        try {
            const response = await axios.put(`${API_URL}/api/users/${id}`, {
                name: name,
                email: email
            })
            response.status === 200 ? console.log("PUT req is good") || setReqStatus(false) : console.log("something wrong")
        } catch (e) {
            console.log(e)
        }
    }

    return <>
        <Navbar />
        <div className={classes.usersWrapper}>
            <div>Исправьте данные пользователя</div>
            <form>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" required
                        defaultValue={name}
                        onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" required
                        defaultValue={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <Link href={"/users"} >
                    {!reqStatus ? <button type="button" className={classes.MenuButton}
                        onClick={() => { updateUser(), setReqStatus(true) }}>update</button> : <Preloader />}
                </Link>
            </form>
        </div>
    </>
}

export default UserForm
