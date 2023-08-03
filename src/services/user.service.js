import { apiClient } from "./api-client";

class UserService {
    constructor(api) {
        this.api = api;
      }

    async getUsers() {
        return await this.api.getAll();
    }
    async getUser(id) {
        return await this.api.getOne(id);
    }
    async postUser(name, email, password) {
        await this.api.postOne(name, email, password);
    }
    async updateUser(id, name, email) {
        await this.api.updateOne(id, name, email);
    }
    async deleteUser(id) {
        await this.api.deleteOne(id);
    }
}

export const userService = new UserService(apiClient);
