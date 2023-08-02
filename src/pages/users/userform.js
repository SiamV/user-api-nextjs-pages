import UserFormCreate from "../../components/UserFormCreate/UserFormCreate";
import { useRouter } from "next/router";
import { UserService } from "../../services/user.service";

const Form = ({ userFromDB }) => {
    const getRouterPath = useRouter();
    const GetUserService = new UserService();

    return (
        <UserFormCreate
            userUpdate={userFromDB}
            statusForm={JSON.parse(getRouterPath.query.status)}
        />
    )
}

export const getServerSideProps = async ({ query }) => {
    if (query.idUser) {
        const GetUserService = new UserService();
        const user = await GetUserService.getUser(query.idUser);
        return { props: { userFromDB: user.data.data } }
    }
    return { props: { userFromDB: {} } }
}

export default Form;
