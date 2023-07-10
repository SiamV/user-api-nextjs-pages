import Link from "next/link"
import Navbar from "../components/Navbar"
import axios from "axios"
import classes from "../styles/users.module.css"
import { API_URL } from "../config/index"

const CreateUsersList = ({ usersList }) => {

    return <div className={classes.usersWrapper}>
        <Navbar />
        <div className={classes.usersBlock}>
            <p>Список пользователей</p>
            <div>{usersList.map((user) =>
                <div key={user._id} >
                    <Link href={`/users/${u._id}`}>{user.name}</Link>
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

export default CreateUsersList

export const getServerSideProps = async () => {

    const getUsers = await axios.get(`${API_URL}/api/users`)

    return { props: { usersList: getUsers.data.data } }

}
