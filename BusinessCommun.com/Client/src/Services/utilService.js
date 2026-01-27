import config from './config'
import axios from 'axios'

export async function getDomains() {
    try {
        const url = `${config.server}/utils/domains`
        const response = await axios.get(url)
        if (response.data && response.data.status === 'success') {
            return response.data.data
        }
        return []
    } catch (ex) {
        console.log('Error fetching domains', ex)
        return []
    }
}

export async function getOrgTypes() {
    try {
        const url = `${config.server}/utils/org-types`
        const response = await axios.get(url)
        if (response.data && response.data.status === 'success') {
            return response.data.data
        }
        return []
    } catch (ex) {
        console.log('Error fetching org types', ex)
        return []
    }
}
