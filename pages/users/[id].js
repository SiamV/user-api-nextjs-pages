import { useRouter } from 'next/router'
import { useState } from "react"
import Navbar from '../../components/Navbar'
import axios from 'axios'
import Link from "next/link"
import Preloader from '../../components/common/Preloader'
import classes from "../../styles/users.module.css"
import { API_URL }  from "../../config/index"

export default function Page({ user }) {
  const router = useRouter()
  const [reqStatus, setReqStatus] = useState(false)

  const deleteUser = async (idUser) => {
    try {
      const response = await axios.delete(`${API_URL}/api/users/${idUser}`)
      response.status === 200 ? console.log("DELETE req is good") || setReqStatus(false) : console.log("something wrong")
    } catch (e) {
      console.log(e)
    }
  }

  return <>
    <Navbar />
    <div className={classes.usersWrapper}>
      <p>User Id : {router.query.id}</p>
      <p>User name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Registration date: {user.register_date}</p>

      {!reqStatus ?
        <div>
          <Link href={"/users"} >
            <button className={classes.MenuButton}
              type='button'
              onClick={() => {
                deleteUser(router.query.id),
                  setReqStatus(true)
              }}>delete
            </button>
          </Link>
          <Link href={{
            pathname: "/users/userform-update",
            query: { id: user._id, name: user.name, email: user.email, status: false }
          }}>
            <button className={classes.MenuButton}>update</button>
          </Link>
        </div>
        : <Preloader />}
    </div >
  </>
}

export const getServerSideProps = async ({ params }) => {
  const user = await axios.get(`${API_URL}/api/users/${params.id}`)
  return { props: { user: user.data.data } }
}
