import Link from "next/link"
import Navbar from "../components/Navbar"
import axios from "axios"
import classes from "../styles/users.module.css"
import { API_URL } from "../config/index"

const Users = ({ users }) => {

    return <div className={classes.usersWrapper}>
        <Navbar />
        <div className={classes.usersBlock}>
            <p>Список пользователей</p>
            <div>{users.map((u) =>
                <div key={u._id} >
                    <Link href={`/users/${u._id}`}>{u.name}</Link>
                </div>)}
            </div>
            <Link href={{
                pathname: "/users/userform",
                query: { status: true }
            }}>
                <button className={classes.MenuButton}>Add user</button>
            </Link>
        </div>

    </div>
}

export default Users

export const getServerSideProps = async () => {

    const users = await axios.get(`${API_URL}/api/users`)

    return { props: { users: users.data.data } }

}
