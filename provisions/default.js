/* Busca dados CPE */
const hourly = Date.now(3600000);
const every_ten_minutes = Date.now(600000);
const dayly = Date.now(24*3600000);
function getTr069(){
	declare("InternetGatewayDevice.ManagementServer.*", {path: hourly, value: hourly});
	declare("InternetGatewayDevice.DeviceInfo.*", {path: hourly, value: hourly});
  	declare("InternetGatewayDevice.WANDevice.*.*.*", {path: hourly, value: hourly});
	declare("InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.*.*.*", {path: hourly, value: hourly});
	declare("InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.*.*.*.*", {path: hourly, value: hourly});
	declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.*", {path: hourly, value: hourly});
  	declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.*.*", {path: hourly, value: hourly});
	declare("InternetGatewayDevice.LANDevice.*.LANHostConfigManagement.*.*", {path: hourly, value: hourly});
  	declare("InternetGatewayDevice.LANDevice.*.Hosts.Host.*.*", {path: hourly, value: hourly});
}
function getTr181(){
	declare("Device.WiFi.*.*.*.*", {path: hourly, value: hourly});
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