#!/usr/bin/env node
//FILENAME: firmwares
let https = require("http");
const URI = "http://localhost:7557/files?query={%22metadata.fileType%22%3A%221%20Firmware%20Upgrade%20Image%22}"
exports.getFirmware = (args, callback) => {
    let [product_class, OUI, last_file] = args
    const request = https.request(URI, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            if (body && body.length > 0) {
                let files = []
                let retorno = undefined;
                body.forEach(file => {
                    if (file.metadata.productClass === product_class && (file.metadata.oui === OUI || file.metadata.oui === "")) {
                        files.push({
                            i: new Date(file.uploadDate).getTime(),
                            filename: file.filename,
                            version: file.metadata.version
                        })
                    }
                })
                files = files.sort((a, b) => {
                    if (a.filename < b.filename) return -1;
                    if (a.filename > b.filename) return 1;
                    return 0;
                })
                if(last_file){
                    files.forEach((file,index) => {
                        if (file.filename === last_file) {
                            retorno = files[index+1]
                        }
                    })
                    if(retorno==undefined){
                        retorno = files[0]
                    }
                }else{
                    retorno = files[0]
                }
                if (retorno == undefined) {
                    callback(null, { filename: false })
                } else {
                    callback(null, retorno)
                }
            } else callback(null, { filename: false })
        });
    })
    request.on('error', (error) => {
        console.log('An error', error);
        callback(null, { filename: false })
    });
    request.end()
}