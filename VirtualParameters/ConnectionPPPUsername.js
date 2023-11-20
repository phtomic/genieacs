let m = "<--empty-->";
let data = [
	"InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANPPPConnection.*.Username",
  	"Device.PPP.Interface.*.Username"
]
for(let path of data){
  let igd = declare(
  path,
  {value: Date.now()});
  if (igd.size) {
    for (let p of igd) {
      if (p.value[0]) {
        m = p.value[0];
        break;
      }
    }  
  }
}
return {writable: false, value: [m, "xsd:string"]};