import Link from "next/link"
import axios from "axios"
import classes from "../styles/users.module.css"
import { API_URL } from "../config/index"

export default function CreateUsersList ({ usersList }) {

    return <div className={classes.usersWrapper}>
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

export async function getStaticProps() {
    const getUsers = await axios.get(`${API_URL}/api/users`)

    return {
      props: {
        usersList: getUsers.data.data.reverse()
      },
    }
  }

// export const getServerSideProps = async () => {

//         const getUsers = await axios.get(`${API_URL}/api/users`)

//         return { props: { usersList: getUsers.data.data.reverse() } }
// }


// export default CreateUsersList
