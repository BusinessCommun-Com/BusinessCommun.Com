const { default: axios } = require("axios");
const eurekaClient = require("../eureka/eureka-client");


function getBackendInstance() {

    const instances = eurekaClient.getInstancesByAppId("BACKEND");

    if (!instances || instances.length === 0) {
        throw new Error("No instances of BACKEND service found");
    }

    const instance = instances[0];
    return `http://${instance.ipAddr}:${instance.port.$}`;
}

async function getIdAndEmail(token) {
    const baseUrl = getBackendInstance();

    const response = await axios.get(`${baseUrl}/users/getIdAndEmail`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

module.exports = {
    getIdAndEmail
};