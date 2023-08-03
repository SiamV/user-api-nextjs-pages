import UserFormCreate from "../../components/UserFormCreate/UserFormCreate";
import { useRouter } from "next/router";
import { UserService } from "../../services/user.service";

const Form = ({ userFromDB }) => {
    const getRouterPath = useRouter();

    return (
        <UserFormCreate
            userUpdate={userFromDB}
            statusForm={JSON.parse(getRouterPath.query.status)}
        />
    )
}

export const getServerSideProps = async ({ query }) => {
    if (query.idUser) {
        const user = await UserService.getUser(query.idUser);
        return { props: { userFromDB: user } }
    }
    return { props: { userFromDB: {} } }
}

export default Form;
