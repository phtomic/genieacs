/* Adquire Usuario PPP do CPE */
let m = "<--empty-->";
const CpeProtocol = declare("VirtualParameters.CpeProtocol", { value: Date.now() })?.value?.[0];
const data = [
    ...['tr069', 'unknowm'].includes(CpeProtocol) ? [
        "InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANPPPConnection.*.Username",
    ] : [],
    ...['tr181', 'unknowm'].includes(CpeProtocol) ? [
        "Device.PPP.Interface.*.Username"
    ] : []
];
for (const path of data) {
    const igd = declare(
        path,
        { value: Date.now() }
    );
    if (igd.size) {
        for (const p of igd) {
            if (p.value[0]) {
                m = p.value[0];
                break;
            }
        }
    }
}
return { writable: false, value: [m, "xsd:string"] };