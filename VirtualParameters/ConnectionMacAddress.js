/* Adquire Mac do CPE */
let m = "__:__:__:__:__:__";
const CpeProtocol = declare("VirtualParameters.CpeProtocol", { value: Date.now() })?.value?.[0];
const data = [
    ...['tr069', 'unknowm'].includes(CpeProtocol) ? [
        "InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANIPConnection.*.MACAddress",
        "InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANPPPConnection.*.MACAddress",
    ] : [],
    ...['tr181', 'unknowm'].includes(CpeProtocol) ? [
        "Device.Ethernet.Link.*.MACAddress",
        "Device.WANDevice.*.WANConnectionDevice.*.WANIPConnection.*.MACAddress",
    ] : []
];
const notFirst = ["Device.Ethernet.Link.*.MACAddress"];
for (const path of data) {
    const igd = declare(
        path,
        { value: Date.now() }
    );
    if (igd.size) {
        for (const p of igd) {
            if (p.value[0]) {
                m = p.value[0];
                if (!notFirst.includes(path))
                    break;
            }
        }
    }
}
return { writable: false, value: [m?.toUpperCase(), "xsd:string"] };