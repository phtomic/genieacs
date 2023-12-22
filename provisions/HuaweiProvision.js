let now = Date.now()
const FetchRouterInfo = (param,value) => {
  declare(param, {value: now}, {value:value})
}

declare("InternetGatewayDevice.X_HW_Security.AclServices.WanAccess.*", null, {path: 1});
declare("InternetGatewayDevice.X_HW_Security.AclServices.WanAccess.*", {value:1});
declare("InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANPPPConnection.*.X_HW_IPv6Enable", {value: now}, {value: true});
declare("InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANPPPConnection.*.X_HW_IPv6.IPv6Address.*", null, {path: 1});
declare("InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANPPPConnection.*.X_HW_IPv6.IPv6Address.*", {path: now});
declare("InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANPPPConnection.*.X_HW_IPv6.IPv6Prefix.*", null, {path: 1});
declare("InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANPPPConnection.*.X_HW_IPv6.IPv6Prefix.*", {path: now});
declare("InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANPPPConnection.*.X_HW_IPv6.IPv6Address.*.Origin", {value: now}, {value: 'AutoConfigured'});
declare("InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANPPPConnection.*.X_HW_IPv6.IPv6Prefix.*.Origin", {value: now}, {value: 'PrefixDelegation'});
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.RegulatoryDomain", {value: now}, {value: 'BR'});
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.AutoChannelEnable", {value: now}, {value: true});
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.5.X_HW_HT20", {value: now}, {value: 4});
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.1.X_HW_HT20", {value: now}, {value: 0});
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.Channel", {value: now}, {value: 0});
//declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.AutoRateFallBackEnabled", {value: now}, {value: true});

//CONFIGURA ACESSO REMOTO

const pppInterface = JSON.parse(declare("VirtualParameters.PPPInterfacePath",{value:Date.now()}).value[0])
FetchRouterInfo("InternetGatewayDevice.X_HW_Security.AclServices.WanAccess.*.WanName", pppInterface.path);
FetchRouterInfo("InternetGatewayDevice.X_HW_Security.AclServices.WanAccess.*.Protocol", "HTTP");
//FetchRouterInfo("InternetGatewayDevice.X_HW_Security.AclServices.WanAccess.1.SrcIPPrefix", "0.0.0.0/0");
FetchRouterInfo("InternetGatewayDevice.X_HW_Security.AclServices.WanAccess.*.Enable",1);
declare("InternetGatewayDevice.X_HW_Security.AclServices.HTTPWanEnable", null, {value: false});
