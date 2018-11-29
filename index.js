module.exports = (service) => {
    const NODE_ENV = process.env.NODE_ENV;
    if(process.env[`GRPC_HOST_${service}`]) {
        return process.env[`GRPC_HOST_${service}`];
    } else if(NODE_ENV === "TEST") {
        const hostFile = fs.readFileSync("./hosts.json");
        const hosts = JSON.parse(hostFile);
        return hosts.ip + hosts.ports[service];
    } else {
        return `dns:///${service}.arys-${NODE_ENV}.svc.cluster.local`;
    }
};
