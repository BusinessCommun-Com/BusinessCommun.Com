const { Eureka } = require("eureka-js-client");

const eurekaClient = new Eureka({
  instance: {
    app: "NODE-SERVICE",
    instanceId: "node-service-1",
    hostName: "localhost",
    ipAddr: "127.0.0.1",

    port: {
      $: 5000,
      "@enabled": true,
    },

    vipAddress: "NODE-SERVICE",

    statusPageUrl: "http://localhost:5000/",
    healthCheckUrl: "http://localhost:5000/",

    dataCenterInfo: {
      "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
      name: "MyOwn",
    },
  },

  eureka: {
    host: "localhost",
    port: 8761,
    servicePath: "/eureka/apps/",
    fetchRegistry: true,
    registerWithEureka: true,
  },
});

module.exports = eurekaClient;
