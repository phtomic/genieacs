let m = "";
let data = {
  	"InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANIPConnection.*":[
    	"AddressingType",
        "ConnectionStatus",
        "Connected"
    ],
  	"InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANPPPConnection.*":[
    	"TransportType",
        "ConnectionStatus",
        "Connected"
    ],
  	"Device.IP.Interface.*":[
     	"X_TP_ConnType",
     	"X_TP_ServiceType",
      	"Internet"
     ]
}
let index = 0;
for(let path of Object.keys(data)){
  let alg = data[path]
  let igd = declare(path.concat(".",alg[0]),{value: Date.now()});
  let valid = declare(path.concat(".",alg[1]),{value: Date.now()});
  if ((m=="" || m==null || m==undefined) && igd.size && valid.size) {
    for (let p of igd) {
      for (let v of valid){
        if (v.value[0]==alg[2] && p.value[0]) {
          m = p.value[0];
          break;
        }
      }
    }  
  }
  index++;
}
return {writable: false, value: [m, "xsd:string"]};