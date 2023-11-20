let m = "__:__:__:__:__:__";
let data = [
	"Device.WANDevice.*.WANConnectionDevice.*.WANIPConnection.*.MACAddress",
	"InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANIPConnection.*.MACAddress",
	"InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANPPPConnection.*.MACAddress",
  	"Device.Ethernet.Link.*.MACAddress"
]
let notFirst = ["Device.Ethernet.Link.*.MACAddress"]
for(let path of data){
  let igd = declare(
  path,
  {value: Date.now()});
  if (igd.size) {
    for (let p of igd) {
      if (p.value[0]) {
        m = p.value[0];
        if(!notFirst.includes(path))
        break;
      }
    }  
  }
}
return {writable: false, value: [m?.toUpperCase(), "xsd:string"]};