import config from './config'
import axios from  'axios'

export async function login(email, password) { 
    try{ 
        const url = `${config.server}/user/`
        const body = {email , password}
        const response = await axios.post(url , body)
        return response.data
    }catch(ex) { 
        console.log('Error' , ex)
    }
}

export async function register(firstName, lastName, email, password) {
    try{ 
        
        const url = `${config.server}/user/register`
        const body = { firstName, lastName, email, password }
        const response = await axios.post(url, body)
        return response.data

    }catch(ex) { 
        console.log('Error' , ex)
    }
}