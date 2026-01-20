import config from './config'
import axios from  'axios'

export async function login(email, password) { 
    try{ 
        const url = `${config.server}/users/login`
        const body = {email , password}
        const response = await axios.post(url , body)
        return response.data
    }catch(ex) { 
        console.log('Error' , ex)
    }
}

export async function register(firstName, lastName, email, password) {
    try{ 
        const role = "ROLE_USER"
        const url = `${config.server}/users/register`
        const body = { firstName, lastName, email, password, role}
        const response = await axios.post(url, body)
        return response.data

    }catch(ex) { 
        console.log('Error' , ex)
    }
}