import { useRouter } from 'next/router'
import { useState } from "react"
import axios from 'axios'
import Link from "next/link"
import Preloader from '../../components/common/Preloader'
import classes from "../../styles/users.module.css"
import { API_URL }  from "../../config/index"

const CreateUserPage = ({ userFromDB }) => {
  const getRoutegParh = useRouter()
  const [responseStatus, setResponseStatus] = useState(false)

  const deleteUser = async (idUser) => {
    try {
      const response = await axios.delete(`${API_URL}/api/users/${idUser}`)
      response.status === 200 ? console.log("DELETE req is good") || setResponseStatus(false) : console.log("something wrong")
    } catch (e) {
      console.log(e)
    }
  }

  return <>
    <div className={classes.usersWrapper}>
      <p>User Id : {getRoutegParh.query.id}</p>
      <p>User name: {userFromDB.name}</p>
      <p>Email: {userFromDB.email}</p>
      <p>Registration date: {userFromDB.register_date}</p>

      {!responseStatus ?
        <div>
          <Link href={"/users"} >
            <button className={classes.MenuButton}
              type='button'
              onClick={() => {
                deleteUser(getRoutegParh.query.id),
                setResponseStatus(true)
              }}>delete
            </button>
          </Link>
          <Link href={{
            pathname: "/users/userform-update",
            query: { id: userFromDB._id, name: userFromDB.name, email: userFromDB.email, setStatus: false }
          }}>
            <button className={classes.MenuButton}>update</button>
          </Link>
        </div>
        : <Preloader />}
    </div >
  </>
}

export const getServerSideProps = async ({ params }) => {
  const getUserById = await axios.get(`${API_URL}/api/users/${params.id}`)
  return { props: { userFromDB: getUserById.data.data } }
}

export default CreateUserPage
