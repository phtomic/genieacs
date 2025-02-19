/* Adquire RX PON do CPE (quando for ONT) */
let m = -Infinity;
const CpeProtocol = declare("VirtualParameters.CpeProtocol", { value: Date.now() })?.value?.[0];
const data = [
    ...['tr069', 'unknowm'].includes(CpeProtocol) ? [
        "InternetGatewayDevice.WANDevice.*.X_GponInterafceConfig.RXPower",
        "InternetGatewayDevice.WANDevice.*.X_GponInterfaceConfig.RXPower",
        "InternetGatewayDevice.X_ALU_OntOpticalParam.RXPower",
        "InternetGatewayDevice.WANDevice.*.X_ZTE-COM_WANPONInterfaceConfig.RXPower",
        "InternetGatewayDevice.WANDevice.1.X_CT-COM_GponInterfaceConfig.RXPower",
    ] : [],
    ...['tr181', 'unknowm'].includes(CpeProtocol) ? [
        "Device.Optical.Interface.1.X_TP_GPON_Config.RXPower"
    ] : []
];
const treat = {
    "Device.Optical.Interface.1.X_TP_GPON_Config.RXPower": -1 / 10
};
for (const path of data) {
    const igd = declare(
        path,
        { value: Date.now() }
    );
    if (igd.size) {
        for (const p of igd) {
            if (p.value[0]) {
                m = Math.floor(p.value[0] * (treat[path] || 1) * 100) / 100;
                break;
            }
        }
    }
}
return { writable: false, value: [m, "xsd:int"] };