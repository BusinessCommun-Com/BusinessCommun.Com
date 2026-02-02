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

export async function saveUserDetailsForPremierInvestor() {
    try {
        const response = await api.post("/api/user/get-user-details");
        return response.data;
    } catch (ex) {
        console.log('Error', ex);
    }
}

export async function syncAndFetchUser() {
    try {
        
        const token = localStorage.getItem("token");

        await api.post("/api/user/get-user-details", {}, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const response = await api.get("/api/user/me", {
            headers: { Authorization: `Bearer ${token}` }
        });;

        // Return the data object: { userId: 1 }
        return response.data;
    } catch (ex) {
        console.error('User sync/fetch failed:', ex);
        throw ex;
    }
}