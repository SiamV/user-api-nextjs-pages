import UserFormCreate from "../../components/UserFormCreate/UserFormCreate"
import { useRouter } from "next/router"
import { getUser } from "@/src/services/api-client"

const Form = ({ userFromDB }) => {
    const getRouterPath = useRouter()

    return (
        <UserFormCreate
            userUpdate={userFromDB}
            statusForm={JSON.parse(getRouterPath.query.status)}
        />
    )
}

export const getServerSideProps = async ({ query }) => {
    if (query.idUser) {
        const user = await getUser(query.idUser)
        return { props: { userFromDB: user.data.data } }
    }
    return { props: { userFromDB: {} } }
}

export default Form
