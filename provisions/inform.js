/* Device credentials */
const username_inform = decodeURI(declare("DeviceID.ID", {value: 1}).value[0]).replace(/ /g,"_");
const password = Math.trunc(Math.random() * Number.MAX_SAFE_INTEGER).toString(36);
const informInterval = 30;
const daily = Date.now(86400000);
function getTr069(){
	declare("InternetGatewayDevice.ManagementServer.ConnectionRequestUsername", {value: daily}, {value: username_inform});
	declare("InternetGatewayDevice.ManagementServer.ConnectionRequestPassword", {value: daily}, {value: password});
	declare("InternetGatewayDevice.ManagementServer.PeriodicInformEnable", {value: daily}, {value: true});
	declare("InternetGatewayDevice.ManagementServer.PeriodicInformInterval", {value: daily}, {value: informInterval});
}
function getTr181(){
	declare("Device.ManagementServer.ConnectionRequestUsername", {value: daily}, {value: username_inform});
	declare("Device.ManagementServer.ConnectionRequestPassword", {value: daily}, {value: password});
	declare("Device.ManagementServer.PeriodicInformEnable", {value: daily}, {value: true});
	declare("Device.ManagementServer.PeriodicInformInterval", {value: daily}, {value: informInterval});
}

const IGNORE = declare("Tags.IGNORE", {value: 1});
if (IGNORE.value !== undefined) {
    return;
}
let CpeProtocol = declare("VirtualParameters.CpeProtocol", {value: Date.now()})?.value?.[0];

if(CpeProtocol === 'tr069') return getTr069();
if(CpeProtocol === 'tr181') return getTr181();

getTr069();
getTr181();
