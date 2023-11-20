const { getMapeamentos } = require("./exts/cpe_mapeamentos");
const { getFirmware } = require("./exts/firmware_upgrade");

getFirmware([
    'E4L-H5410WA',
    'E4L_5410WA_V6.2.9T27.bin'
],(v,data)=>{
    console.log(data)
})