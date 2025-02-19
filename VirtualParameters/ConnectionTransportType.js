/* Adquire TransportType do CPE */
let m = "";
const CpeProtocol = declare("VirtualParameters.CpeProtocol", {value: Date.now()})?.value?.[0];
const data = {
    ...['tr069', 'unknowm'].includes(CpeProtocol) ? {
        "InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANIPConnection.*": [
            "AddressingType",
            "ConnectionStatus",
            "Connected"
        ],
        "InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANPPPConnection.*": [
            "TransportType",
            "ConnectionStatus",
            "Connected"
        ],
    } : {},
    ...['tr181', 'unknowm'].includes(CpeProtocol) ? {
        "Device.IP.Interface.*": [
            "X_TP_ConnType",
            "X_TP_ServiceType",
            "Internet"
        ]
    } : {}
};
let index = 0;
for (const path of Object.keys(data)) {
    const alg = data[path];
    const igd = declare(path.concat(".", alg[0]), { value: Date.now() });
    const valid = declare(path.concat(".", alg[1]), { value: Date.now() });
    if ((m == "" || m == null || m == undefined) && igd.size && valid.size) {
        for (const p of igd) {
            for (const v of valid) {
                if (v.value[0] == alg[2] && p.value[0]) {
                    m = p.value[0];
                    break;
                }
            }
        }
    }
    index++;
}
return { writable: false, value: [m, "xsd:string"] };