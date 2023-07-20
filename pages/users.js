import Link from "next/link"
import axios from "axios"
import { useState, useEffect } from 'react'
import classes from "../styles/users.module.css"
import { API_URL } from "../config/index"
import Preloader from "../components/common/Preloader"


//Here I use React for render html in client side.
//Because the page don't need for search google robot. But it is optimisation page /users.
export default function CreateUsersList() {

    const [usersList, setUserList] = useState([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const getUsersListfromDB = async () => {
            try {
                const getUsers = await axios.get(`${API_URL}/api/users`)
                getUsers.status === 200 ? setLoading(false) : console.log("something wrong")
                setUserList(getUsers.data.data.reverse())
            } catch (e) {
                console.log(e)
            }
        }
        getUsersListfromDB()
    }, [])

    return <div className={classes.usersWrapper}>
        <div className={classes.usersBlock}>
            <h3>Список пользователей</h3>
            {!isLoading
                ? <div>
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
                : <Preloader />
            }

        </div>

    </div>
}








// Michael, Vlad. Please leave this code. It is for exemple use SSR and SSG

// export default function CreateUsersList ({ usersList }) {

//     return <div className={classes.usersWrapper}>
//         <div className={classes.usersBlock}>
//             <h3>Список пользователей</h3>
//             <div className={classes.usersListWrapper}>
//                 {usersList.map((user) =>
//                     <div key={user._id} className={classes.userWrapper}>
//                         <Link href={`/users/${user._id}`}>{user.name}</Link>
//                     </div>)
//                 }
//             </div>
//             <Link href={{
//                 pathname: "/users/userform",
//                 query: { status: true }
//             }}>
//                 <button className={classes.MenuButton}>Add user</button>
//             </Link>
//         </div>

//     </div>
// }

// export async function getStaticProps() {
//     const getUsers = await axios.get(`${API_URL}/api/users`)

//     return {
//       props: {
//         usersList: getUsers.data.data.reverse()
//       },
//     }
//   }

// export async function getServerSideProps() {
//     const getUsers = await axios.get(`${API_URL}/api/users`)

//     return {
//         props: {
//             usersList: getUsers.data.data.reverse()
//         },
//     }
// }
