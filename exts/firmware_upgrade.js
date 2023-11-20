#!/usr/bin/env node
//FILENAME: firmwares
let https = require( "http" );
const URI = "http://localhost:3002/files?query={%22metadata.fileType%22%3A%221%20Firmware%20Upgrade%20Image%22}"
exports.getFirmware = (args,callback) => {
    let [product_class,last_file] = args
    const request = https.request(URI, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });
    
        response.on('end', () => {
            const body = JSON.parse(data);
            if(body && body.length>0){
                let files = []
                body.forEach(file => {
                    if(file.metadata.productClass===product_class){
                        files.push({
                            i: new Date(file.uploadDate).getTime(),
                            filename: file.filename,
                            version: file.metadata.version
                        })
                    }
                })
                files = files.sort((a,b)=>{
                    if (a.i < b.i) return -1;
                    if (a.i > b.i) return 1;
                    return 0;
                })
                let retorno = files[files.length -1]
                if(retorno.filename == last_file){
                    callback(null,{filename:false})
                }else{
                    callback(null,retorno)
                }
            }else callback(null, {filename:false})
        });
    })
    request.on('error', (error) => {
        console.log('An error', error);
        callback(null, mapeamento.dados)
    });
    request.end()
}