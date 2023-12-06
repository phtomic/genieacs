const IGNORE = declare("Tags.IGNORE", {value: 1});
if (IGNORE.value !== undefined) {
    return;
}


const hourly = Date.now(3600000);
const every_ten_minutes = Date.now(600000);
const dayly = Date.now(24*3600000);

// Refresh basic parameters hourly
declare("InternetGatewayDevice.DeviceInfo.*", {path: hourly, value: hourly});
declare("InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.*.*.*", {path: hourly, value: hourly});
declare("InternetGatewayDevice.WANDevice.*.*.*", {path: hourly, value: hourly});
declare("InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.*.*.*.*", {path: hourly, value: hourly});
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.SSID", {path: hourly, value: hourly});
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.*", {path: hourly, value: hourly});
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.PossibleChannels", {path: hourly, value: hourly});
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.Channel", {path: hourly, value: hourly});
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.PreSharedKey.*.*", {path: hourly, value: hourly});
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.KeyPassphrase", {path: hourly, value: hourly});
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.Standard", {path: hourly, value: hourly});
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.Enabled", {path: hourly, value: hourly});
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.Standard", {path: hourly, value: hourly});
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.*.Standard", {path: hourly, value: hourly});
declare("InternetGatewayDevice.LANDevice.*.LANHostConfigManagement.*.*", {path: hourly, value: hourly});
declare("InternetGatewayDevice.LANDevice.*.LANHostConfigManagement.ReservedAddresses.*", {path: hourly, value: hourly});
declare("InternetGatewayDevice.LANDevice.*.Hosts.Host.*.HostName", {path: hourly, value: hourly});
declare("InternetGatewayDevice.LANDevice.*.Hosts.Host.*.Enable", {path: every_ten_minutes, value: every_ten_minutes});
declare("InternetGatewayDevice.LANDevice.*.Hosts.Host.*.Active", {path: every_ten_minutes, value: every_ten_minutes});
declare("InternetGatewayDevice.LANDevice.*.Hosts.Host.*.IPAddress", {path: hourly, value: hourly});
declare("InternetGatewayDevice.LANDevice.*.Hosts.Host.*.MACAddress", {path: hourly, value: hourly});
declare("InternetGatewayDevice.ManagementServer.ConnectionRequestUsername", {path: hourly, value: hourly});
declare("InternetGatewayDevice.ManagementServer.ConnectionRequestURL", {path: hourly, value: hourly});
declare("InternetGatewayDevice.ManagementServer.ConnectionRequestPassword", {path: hourly, value: hourly});
declare("InternetGatewayDevice.ManagementServer.EnableCWMP", {path: hourly, value: hourly});
declare("Device.WiFi.*.*.*.*", {path: hourly, value: hourly});