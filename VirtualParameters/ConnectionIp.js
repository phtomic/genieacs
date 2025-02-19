/* Adquire Ip do CPE */
let m = "0.0.0.0";
const CpeProtocol = declare("VirtualParameters.CpeProtocol", { value: Date.now() })?.value?.[0];
const data = [
    ...['tr069', 'unknowm'].includes(CpeProtocol) ? [
        "InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANPPPConnection.*.ExternalIPAddress",
        "InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANIPConnection.*.ExternalIPAddress",
    ] : [],
    ...['tr181', 'unknowm'].includes(CpeProtocol) ? [
        "Device.WANDevice.*.WANConnectionDevice.*.WANIPConnection.*.IP",
        "Device.IP.Interface.*.IPv4Address.*.IPAddress",
    ] : []
];
const notFirst = ["Device.IP.Interface.*.IPv4Address.*.IPAddress"];
for (const path of data) {
    const igd = declare(
        path,
        { value: Date.now() }
    );
    if (igd.size) {
        for (const p of igd) {
            if (p.value[0]) {
                if (p.value[0] != "0.0.0.0") {
                    m = p.value[0];
                    if (!notFirst.includes(path))
                        break;
                }
            }
        }
    }
}
return { writable: false, value: [m, "xsd:string"] };