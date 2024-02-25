const { getMapeamentos } = require("./genieacs/ext/cpe_mapeamentos");
const { getFirmware } = require("./genieacs/ext/firmware_upgrade");
const { pppoeLoginByMac } = require('./genieacs/ext/cpe_autoconfig');
const { readFileSync } = require("fs");
/*getFirmware([
    'HG6143D',
    '000AC2',
    'HG6143D - RP2815.bin'
],(v,data)=>{
    console.log(data)
})
*/
let cf = readFileSync('./provisions/teste.xml','utf-8')
let sn = 'E8:9E:0C:03:C3:21'
//sn = cf.split('VendorId="FHTT" SerialNumber="')[1].split('" Password=')[0]
pppoeLoginByMac([sn],(v,data)=>{console.log(data)})