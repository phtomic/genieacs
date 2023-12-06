const { getMapeamentos } = require("./exts/cpe_mapeamentos");
const { getFirmware } = require("./exts/firmware_upgrade");

getFirmware([
    'ZXHN H199A',
    'F864B8',
    undefined
],(v,data)=>{
    console.log(data)
})