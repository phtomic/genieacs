// Device ID as user name
const IGNORE = declare("Tags.IGNORE", {value: 1});
if (IGNORE.value !== undefined) {
    return;
}

const username_inform = decodeURI(declare("DeviceID.ID", {value: 1}).value[0]).replace(/ /g,"_")
const password = Math.trunc(Math.random() * Number.MAX_SAFE_INTEGER).toString(36);
const informInterval = 300;
const daily = Date.now(86400000);
declare("InternetGatewayDevice.ManagementServer.ConnectionRequestUsername", {value: daily}, {value: username_inform});
declare("InternetGatewayDevice.ManagementServer.ConnectionRequestPassword", {value: daily}, {value: password});
declare("InternetGatewayDevice.ManagementServer.PeriodicInformEnable", {value: daily}, {value: true});
declare("InternetGatewayDevice.ManagementServer.PeriodicInformInterval", {value: daily}, {value: informInterval});
declare("Device.ManagementServer.ConnectionRequestUsername", {value: daily}, {value: username_inform});
declare("Device.ManagementServer.ConnectionRequestPassword", {value: daily}, {value: password});
declare("Device.ManagementServer.PeriodicInformEnable", {value: daily}, {value: true});
declare("Device.ManagementServer.PeriodicInformInterval", {value: daily}, {value: informInterval});
const product_class = declare("DeviceID.ProductClass", { value: 1 }).value[0];

/*

Realiza a configuração inicial para dispositivos da TP-Link.

Se o dispositivo estiver com a tag NOT_PROVISION o script não será executado.
    
Se o usuário do PPPOE estiver correto, o script não será executado. 

*/
const now = Date.now();

const mac = declare("VirtualParameters.ConnectionMacAddress", { value: 1 }).value[0];

let auth = ext("cpe_autoconfig", 'pppoeLoginByMac', mac);

let params_by = ext("cpe_mapeamentos", 'getMapeamentos');

if (!auth || !auth.username || !auth.password) {

}
function getWifiParam(index){
    if(index == 2){
        return params_by?.[product_class.toLowerCase()]?.[index]
    }
	return {
      ssid: params_by?.[product_class.toLowerCase()]?.[index]?.ssid || `InternetGatewayDevice.LANDevice.*.WLANConfiguration.${index?5:1}.SSID`,
      password: params_by?.[product_class.toLowerCase()]?.[index]?.password || `InternetGatewayDevice.LANDevice.*.WLANConfiguration.${index?5:1}.PreSharedKey.*.KeyPassphrase`
    }
}
declare("InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANPPPConnection.*.*", { path: now }); //refresh
declare("VirtualParameters.*", { path: now }); //refresh
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.*", { path: now }); //refresh

const username = declare("VirtualParameters.ConnectionPPPUsername", { value: 1 });
const wireless = declare(getWifiParam(0).ssid, { value: 1 });
const wireless5 = declare(getWifiParam(1).ssid, { value: 1 });
if (
	!(wireless && wireless.value && wireless.value.length > 1 && auth.wifi_ssid == wireless.value[0]) ||
  	!(wireless5 && wireless5.value && wireless5.value.length > 1 && auth.wifi_ssid_5 == wireless5.value[0])
) {
    // configura o Wifi com os dados encontrados
    createWifiConfiguration( auth );
}
if (
  !(
    username &&
    username.value &&
    username.value.length > 1 &&
    auth.username == username.value[0]
  ) && auth.servico_tipo_conexao?.toLowerCase() == "pppoe"
) {
    // configura o PPPOE com o usuario encontrado
    createPPPOEConnection( auth );
}

function createWifiConfiguration(auth){
  	function setD(param,val){
    	if(val!=undefined && val!=false && val!=null){
          	if (val.trim() && val.trim()!="undefined" && val.trim()!="") {
        		declare(param,{value:now},{value:val});
        	}
        }
    }
  	if(getWifiParam(2)!==undefined){
    	Object.keys(getWifiParam(2)).map(itemParam => {
          	let r = declare(itemParam,{value:1})
        	setD(itemParam,getWifiParam(2)[itemParam])
        })
    }
    setD(getWifiParam(0).ssid,auth.wifi_ssid);
    if (auth.wifi_password?.toString()?.trim()?.length >= 8)
    setD(getWifiParam(0).password,auth.wifi_password);
    
    setD(getWifiParam(1).ssid,auth.wifi_ssid_5);
    if (auth.wifi_password_5?.toString()?.trim()?.length >= 8)
    setD(getWifiParam(1).password,auth.wifi_password_5);
}

function createPPPOEConnection(auth) {

    //CONFIGURA PPPOE
    declare("InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANPPPConnection.*", null, { path: 1 });
    declare("InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANPPPConnection.*.*", { path: now }); //refresh
    declare("InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANPPPConnection.*.ConnectionType", { value: now }, { value: "IP_Routed" });
    declare("InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANPPPConnection.*.Enable", { value: now }, { value: true });
    declare("InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANPPPConnection.*.Username", { value: now }, { value: auth.username });
    declare("InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANPPPConnection.*.Password", { value: now }, { value: auth.password });
    declare("InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANPPPConnection.*.PPPAuthenticationProtocol", { value: now }, { value: "AUTO_AUTH" });

    //CLEAN IP_DHCP CONNECTION
    declare("InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANIPConnection.*.Enable", { path: now, value: now }, { value: false });
}
