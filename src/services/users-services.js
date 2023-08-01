import { getOne, getAll, postOne, updateOne, deleteOne } from "./api-client";

export const getUsers = async () => {
    const Users = await getAll();
    return Users;
}

export const getUser = async (id) => {
    const UserFromDB = await getOne(id);
    return UserFromDB;

}

export const postUser = async (name, email, password) => {
    await postOne(name, email, password);
}

export const updateUser = async (id, name, email) => {
    await updateOne(id, name, email);

}

export const deleteUser = async (id) => {
    await deleteOne(id);
}
