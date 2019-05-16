const fs = require("fs");

module.exports = (service, isDns = true) => {
    const NODE_ENV = process.env.NODE_ENV;
    if(process.env[`GRPC_HOST_${service}`]) {
        return process.env[`GRPC_HOST_${service}`];
    } else if(NODE_ENV === "TEST") {
        const hostFile = fs.readFileSync(`${__dirname}/hosts.json`);
        const hosts = JSON.parse(hostFile);
        return hosts.ip + hosts.ports[service];
    } else if(isDns){
        return `dns:///${service}.arys-${NODE_ENV}.svc.cluster.local`;
    } else {
        return `${service}.arys-${NODE_ENV}.svc.cluster.local`;
    }
};
