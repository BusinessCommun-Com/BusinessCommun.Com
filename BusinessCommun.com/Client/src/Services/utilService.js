import api from './api'

export async function getDomains() {
    try {
        const url = "/utils/domains"
        const response = await api.get(url)
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
        const url = "/utils/org-types"
        const response = await api.get(url)
        if (response.data && response.data.status === 'success') {
            return response.data.data
        }
        return []
    } catch (ex) {
        console.log('Error fetching org types', ex)
        return []
    }
}
