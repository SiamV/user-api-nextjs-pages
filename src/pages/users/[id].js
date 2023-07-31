import { useRouter } from 'next/router'
import { useState } from "react"
import Link from "next/link"
import Preloader from '../../components/Preloader/Preloader'
import classes from "../../styles/users.module.css"
import { deleteUser, getUser } from '@/src/services/api-client'



//Here I use SSR(Next.js) in server side
//because I wount render htmls this dynamic pages in server for optimisation SEO
const CreateUserPage = ({ userFromDB }) => {
  const getRoutegParh = useRouter()
  const idUser = getRoutegParh.query.id
  const [responseStatus, setResponseStatus] = useState(false)

  const deleteUserFromDB = async (idUser) => {
    try {
      await deleteUser(idUser)
      setResponseStatus(false)
    } catch (e) {
      console.log(`Ошибка ${e.name} : ${e.message} \n ${e.stack}`)
    }
  }

  return <>
    <div className={classes.usersWrapper}>
      <p>User Id : {idUser}</p>
      <p>User name: {userFromDB.name}</p>
      <p>Email: {userFromDB.email}</p>
      <p>Registration date: {userFromDB.register_date}</p>

      {!responseStatus ?
        <div>
          <Link href={"/users"} >
            <button className={classes.MenuButton}
              type='button'
              onClick={() => {
                deleteUserFromDB(idUser),
                  setResponseStatus(true)
              }}>delete
            </button>
          </Link>
          <Link href={{
            pathname: "/users/userform",
            query: { status: false, idUser: idUser }
          }}>
            <button className={classes.MenuButton}>update</button>
          </Link>
        </div>
        : <Preloader />}
    </div >
  </>
}

export const getServerSideProps = async ({ params }) => {
  const user = await getUser(params.id)
  return { props: { userFromDB: user.data.data } }
}

export default CreateUserPage
