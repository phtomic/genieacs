const ID = declare("DeviceID.ID", { value: 1 }).value[0];
const dt = new Date(Date.now())
if(dt.getHours()==17){
	
}else{
  	return ;
}
const last_download = declare("Downloads.[FileType:1 Firmware Upgrade Image].FileName", { value: 1 }).value?.[0]
const productClass = declare("DeviceID.ProductClass", { value: 1 }).value[0];
const OUI = declare("DeviceID.OUI", { value: 1 }).value[0];
const now = Date.now();
let firmware_upgrade = ext('firmwares','getFirmware',productClass,OUI,last_download)
log("UPDATE: ".concat(JSON.stringify(firmware_upgrade)))
function declareAndDownload(firmwareUpgradeImage) {
    declare("Downloads.[FileType:1 Firmware Upgrade Image]", { path: 1 }, { path: 1 });
    declare("Downloads.[FileType:1 Firmware Upgrade Image].FileName", { value: 1 }, { value: firmwareUpgradeImage });
    declare("Downloads.[FileType:1 Firmware Upgrade Image].Download", { value: 1 }, { value: now });
}
if(firmware_upgrade.filename) declareAndDownload(firmware_upgrade.filename)