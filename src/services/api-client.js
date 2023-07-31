import axios from "axios"
import { API_URL } from "../lib/constants/config"

export const getUsers = async () => {
    try {
        const UsersFromDB = await axios.get(`${API_URL}`)
        if (UsersFromDB.status === 200) {
            return UsersFromDB
        }
    } catch (e) {
        console.log(`Ошибка ${e.name} : ${e.message} \n ${e.stack}`)
    }
}

export const getUser = async (id) => {
    try {
        const UserFromDB = await axios.get(`${API_URL}/${id}`)
        if (UserFromDB.status === 200) {
            return UserFromDB
        }
    } catch (e) {
        console.log(`Ошибка ${e.name} : ${e.message} \n ${e.stack}`)
    }

}

export const postUser = async (name, email, password) => {
    try {
        const response = await axios.post(`${API_URL}`, {
            name: name,
            email: email,
            password: password,
            register_date: new Date().toLocaleDateString()
        })
        if (response.status === 200) {
            console.log("user is posted")
        }
    } catch (e) {
        console.log(`Ошибка ${e.name} : ${e.message} \n ${e.stack}`)
    }
}

export const upateUser = async (id, name, email) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, {
            name: name,
            email: email
        })
        if (response.status === 200) {
            console.log("user is updated")
        }
    } catch (e) {
        console.log(`Ошибка ${e.name} : ${e.message} \n ${e.stack}`)
    }

}

export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`)
        if (response.status === 200) {
            console.log("user is deleted")
        }
    } catch (e) {
        console.log(`Ошибка ${e.name} : ${e.message} \n ${e.stack}`)
    }

}
