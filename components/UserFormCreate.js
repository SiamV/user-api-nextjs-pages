import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"
import classes from "../styles/users.module.css"
import Preloader from "../components/common/Preloader"
import { API_URL } from "../config/index"

const UserFormCreate = (props) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [responseStatus, setResponseStatus] = useState(false)

    const [nameError, setNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [haveErrors, setHaveErrors] = useState(false)

    useEffect(() => {
        props.userUpdate.name
            ? setName(props.userUpdate.name)
            : (setName(""), setNameError("имя не может быть пустым!"))
        props.userUpdate.email
            ? setEmail(props.userUpdate.email)
            : (setEmail(""), setEmailError("email не может быть пустым!"))
        setPasswordError("пароль не может быть пустым!")
    }, []);

    useEffect(() => {
        (!nameError && !emailError)
            ? setHaveErrors(false)
            : setHaveErrors(true)
    }, [nameError, emailError])

    const nameHandler = (e) => {
        setName(e.target.value)
        !e.target.value
            ? (setNameError("имя не может быть пустым!"))
            : (setNameError(""))
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const regularExpression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!regularExpression.test(String(e.target.value).toLowerCase())) {
            setEmailError("введите корректный email")
        } else {
            setEmailError("")
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 6) {
            setPasswordError("введите пароль менее 6 символов")
            if (!e.target.value) {
                setPasswordError("пароль не может быть пустым!")
            }
        } else {
            setPasswordError("")
        }
    }

    const addUserinDB = async () => {
        try {
            const response = await axios.post(`${API_URL}/api/users`, {
                name: name,
                email: email,
                password: password,
                register_date: new Date().toLocaleDateString()
            })
            response.status === 200 ? console.log("POST req is good") || setResponseStatus(false) : console.log("something wrong")
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

        <form >
            <div>
                <label htmlFor="name">Name: </label>
                <input type="text"
                    id="name"
                    value={name}
                    onChange={(e) => nameHandler(e)} />
                {(!name || nameError) ? <div style={{ color: "red", fontSize: 12 }}>{nameError}</div> : <div></div>}
            </div>
            <div>
                <label htmlFor="email">Email: </label>
                <input type="email"
                    id="email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => emailHandler(e)} />
                {(!email || emailError) ? <div style={{ color: "red", fontSize: 12 }}>{emailError}</div> : <div></div>}
            </div>

            {props.statusForm ?
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => passwordHandler(e)} />
                    {(!password || passwordError) ? <div style={{ color: "red", fontSize: 12 }}>{passwordError}</div> : <div></div>}
                </div>
                : <div></div>
            }

            {props.statusForm ?
                <div>
                    <Link href={"/users"} >
                        {!responseStatus ? <button type="button" className={classes.MenuButton}
                            disabled={haveErrors}
                            onClick={() => { addUserinDB(), setResponseStatus(true) }}>add new user</button> : <Preloader />}
                    </Link>
                    {(haveErrors) ? <div style={{ color: "red", fontSize: 14 }}>Заполните все поля формы!</div> : <div></div>}

                </div>

                : <div>
                    <Link href={"/users"} >
                        {!responseStatus ? <button type="button" className={classes.MenuButton}
                            disabled={haveErrors}
                            onClick={() => { updateUserInDB(), setResponseStatus(true) }}>update</button> : <Preloader />}
                    </Link>
                    {(haveErrors) ? <div style={{ color: "red", fontSize: 14 }}>Заполните все поля формы!</div> : <div></div>}
                </div>
            }
        </form>
    </>
}

export default UserFormCreate
