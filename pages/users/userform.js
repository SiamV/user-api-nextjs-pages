import UserFormCreate from "../../components/UserFormCreate"
import axios from "axios"
import { API_URL } from "../../config/index"
import { useRouter } from 'next/router'

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
        const getUser = await axios.get(`${API_URL}/api/users/${query.idUser}`)
        return { props: { userFromDB: getUser.data.data } }
    }
    return { props: { userFromDB: {} } }
}

export default Form
