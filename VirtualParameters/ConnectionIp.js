let m = "0.0.0.0";
let data = [
	"Device.WANDevice.*.WANConnectionDevice.*.WANIPConnection.*.IP",
	"InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANPPPConnection.*.ExternalIPAddress",
	"InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANIPConnection.*.ExternalIPAddress",
  	"Device.IP.Interface.*.IPv4Address.*.IPAddress"
]
let notFirst = ["Device.IP.Interface.*.IPv4Address.*.IPAddress"]
for(let path of data){
  let igd = declare(
  path,
  {value: Date.now()});
  if (igd.size) {
    for (let p of igd) {
      if (p.value[0]) {
        if(p.value[0]!="0.0.0.0"){
          m = p.value[0];
          if(!notFirst.includes(path))
        break;
        }
      }
    }  
  }
}
return {writable: false, value: [m, "xsd:string"]};