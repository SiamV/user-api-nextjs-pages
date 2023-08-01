import { ApiClient } from "./api-client";

const GetApiClient = new ApiClient;

export const getUsers = async () => {
    return await GetApiClient.getAll();
}

export const getUser = async (id) => {
    return await GetApiClient.getOne(id);
}

export const postUser = async (name, email, password) => {
    await GetApiClient.postOne(name, email, password);
}

export const updateUser = async (id, name, email) => {
    await GetApiClient.updateOne(id, name, email);

}

export const deleteUser = async (id) => {
    await GetApiClient.deleteOne(id);
}
