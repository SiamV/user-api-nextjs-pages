import UserFormCreate from "../../components/UserFormCreate/UserFormCreate";
import { useRouter } from "next/router";
import { userService } from "../../services/user.service";

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
        const user = await userService.getUser(query.idUser);
        return { props: { userFromDB: user } }
    }
    return { props: { userFromDB: {} } }
}

export default Form;
