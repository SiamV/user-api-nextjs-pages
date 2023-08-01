import axios from "axios";
import { API_URL } from "../lib/constants/config";

export class ApiClient {
    async getAll() {
        try {
            return await axios.get(`${API_URL}`);
        } catch (e) {
            console.log(`Ошибка ${e.name} : ${e.message} \n ${e.stack}`);
        }
    };

    async getOne(id) {
        try {
            return await axios.get(`${API_URL}/${id}`).then(res => res);
        } catch (e) {
            console.log(`Ошибка ${e.name} : ${e.message} \n ${e.stack}`);
        }
    };

    async postOne(name, email, password) {
        try {
            await axios.post(`${API_URL}`, {
                name: name,
                email: email,
                password: password,
                register_date: new Date().toLocaleDateString()
            })
        } catch (e) {
            console.log(`Ошибка ${e.name} : ${e.message} \n ${e.stack}`);
        }
    };

    async updateOne(id, name, email) {
        try {
            await axios.put(`${API_URL}/${id}`, {
                name: name,
                email: email
            })
        } catch (e) {
            console.log(`Ошибка ${e.name} : ${e.message} \n ${e.stack}`);
        }
    };

    async deleteOne(id) {
        try {
            await axios.delete(`${API_URL}/${id}`);
        } catch (e) {
            console.log(`Ошибка ${e.name} : ${e.message} \n ${e.stack}`);
        }
    };
}
