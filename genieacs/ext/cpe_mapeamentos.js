#!/usr/bin/env node
let https = require( "https" );
let fs = require("fs")
const URI = "https://raw.githubusercontent.com/phtomic/genieacs/main/mapeamentos.json"
const mapeamentosDir = "./mapeamentos.tmp"
exports.getMapeamentos = function getMapeamentos(args,callback){
    let mapeamento = fs.existsSync(mapeamentosDir)? JSON.parse(fs.readFileSync(mapeamentosDir,'utf-8')) : {
        timestamp: 0,
        dados: {}
    }
    if(mapeamento.timestamp <= Date.now()){
        const request = https.request(URI, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data = data + chunk.toString();
            });
        
            response.on('end', () => {
                const body = JSON.parse(data);
                mapeamento = {
                    timestamp:Date.now() + 1000 * 60 * 60,
                    dados: body
                }
                fs.writeFileSync(mapeamentosDir,JSON.stringify(mapeamento))
                callback(null, mapeamento.dados)
            });
        })
        request.on('error', (error) => {
            console.log('An error', error);
            callback(null, mapeamento.dados)
        });
        request.end() 
    }else{
        callback(null, mapeamento.dados)
    }
}