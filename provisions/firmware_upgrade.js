const last_download = declare("Downloads.[FileType:1 Firmware Upgrade Image].FileName", { value: 1 }).value[0]
const productClass = declare("DeviceID.ProductClass", { value: 1 }).value[0];
const now = Date.now();
function declareAndDownload(firmwareUpgradeImage) {
    declare("Downloads.[FileType:1 Firmware Upgrade Image]", { path: 1 }, { path: 1 });
    declare("Downloads.[FileType:1 Firmware Upgrade Image].FileName", { value: 1 }, { value: firmwareUpgradeImage });
    declare("Downloads.[FileType:1 Firmware Upgrade Image].Download", { value: 1 }, { value: now });
}

let firmware_upgrade = ext('firmwares','getFirmware',productClass,last_download)
if(firmware_upgrade.filename) declareAndDownload(firmware_upgrade.filename)