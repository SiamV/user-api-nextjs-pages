import { ApiClient } from "./api-client";

class GetService {
    GetApiClient = new ApiClient();

    async getUsers() {
        return await this.GetApiClient.getAll();
    }
    async getUser(id) {
        return await this.GetApiClient.getOne(id);
    }
    async postUser(name, email, password) {
        await this.GetApiClient.postOne(name, email, password);
    }
    async updateUser(id, name, email) {
        await this.GetApiClient.updateOne(id, name, email);
    }
    async deleteUser(id) {
        await this.GetApiClient.deleteOne(id);
    }
}

export const UserService = new GetService();
