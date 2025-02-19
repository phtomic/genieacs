/* Adquire protocolo do CPE */
const IGD = declare("InternetGatewayDevice.ManagementServer.Username",{value: Date.now()});
if(IGD?.value?.[0]) return {writable: false, value: ['tr069', "xsd:string"]};

const DGP = declare("Device.ManagementServer.Username",{value: Date.now()});
if(DGP?.value?.[0]) return {writable: false, value: ['tr181', "xsd:string"]};

return {writable: false, value: ['unknowm', "xsd:string"]};