import api from './api';

export async function login(email, password) {
    try {
        const body = { email, password }
        const response = await api.post("/users/login", body);
        return response.data
    } catch (ex) {
        console.log('Error', ex)
    }
}

export async function register(firstName, lastName, email, password) {
    try {
        const role = "ROLE_USER"
        const url = "/users/register"
        const body = { firstName, lastName, email, password, role }
        const response = await api.post(url, body);
        return response.data

    } catch (ex) {
        console.log('Error', ex)
    }
}