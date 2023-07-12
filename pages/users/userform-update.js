import { useState, useEffect } from "react"
import Navbar from "../../components/Navbar"
import axios from "axios"
import { useRouter } from 'next/router'
import Link from "next/link"
import Preloader from "../../components/common/Preloader"
import classes from "../../styles/users.module.css"
import {API_URL} from "../../config/index"

const UserFormUpdate = () => {
    const getRouterPath = useRouter()
    const [name, setName] = useState(`${getRouterPath.query.name}`)
    const [email, setEmail] = useState(`${getRouterPath.query.email}`)
    const [responseStatus, setResponseStatus] = useState(false)


    const id = getRouterPath.query.id

    const updateUserInDB = async () => {
        try {
            const response = await axios.put(`${API_URL}/api/users/${id}`, {
                name: name,
                email: email
            })
            response.status === 200 ? console.log("PUT req is good") || setResponseStatus(false) : console.log("something wrong")
        } catch (e) {
            console.log(e)
        }
    }

    return <>
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
                    {!responseStatus ? <button type="button" className={classes.MenuButton}
                        onClick={() => { updateUserInDB(), setResponseStatus(true) }}>update</button> : <Preloader />}
                </Link>
            </form>
        </div>
    </>
}

export default UserFormUpdate
