let m = "-200";

let data = [
	"InternetGatewayDevice.WANDevice.*.X_GponInterafceConfig.RXPower",
	"InternetGatewayDevice.WANDevice.*.X_GponInterfaceConfig.RXPower",
	"InternetGatewayDevice.X_ALU_OntOpticalParam.RXPower",
  	"InternetGatewayDevice.WANDevice.*.X_ZTE-COM_WANPONInterfaceConfig.RXPower",
  	"InternetGatewayDevice.WANDevice.1.X_CT-COM_GponInterfaceConfig.RXPower",
  	"Device.Optical.Interface.1.X_TP_GPON_Config.RXPower"
]
let treat = {
"Device.Optical.Interface.1.X_TP_GPON_Config.RXPower":-1/10
}
for(let path of data){
  let igd = declare(
  path,
  {value: Date.now()});
  if (igd.size) {
    for (let p of igd) {
      if (p.value[0]) {
        m = Math.floor(p.value[0]*(treat[path]||1)*100)/100;
        break;
      }
    }  
  }
}
return {writable: false, value: [m, "xsd:int"]};