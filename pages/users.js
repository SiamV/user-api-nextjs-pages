import Link from "next/link"
import Navbar from "../components/Navbar"
import axios from "axios"
import classes from "../styles/users.module.css"
import { API_URL } from "../config/index"

const CreateUsersList = ({ usersList }) => {

    return <div className={classes.usersWrapper}>
        <Navbar />
        <div className={classes.usersBlock}>
            <h3>Список пользователей</h3>
            <div className={classes.usersListWrapper}>
                {usersList.map((user) =>
                    <div key={user._id} className={classes.userWrapper}>
                        <Link href={`/users/${user._id}`}>{user.name}</Link>
                    </div>)
                }
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

export const getServerSideProps = async () => {

    const getUsers = await axios.get(`${API_URL}/api/users`)

    return { props: { usersList: getUsers.data.data.reverse() } }

}

export default CreateUsersList
