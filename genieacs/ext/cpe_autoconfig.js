#!/usr/bin/env node
let https = require( "https" );

const options = (dados)=>{
    return {
        hostname: '',
        port:443,
        path: '/api/ura/consultacliente',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(dados)),
        },
    }
}

exports.pppoeLoginByMac = function pppoeLoginByMac( args, callback ) {    
    const dados = {
        mac_dhcp: args[0].trim(),
        "app": "",
        "token": ""
    }
    const opts = options(dados)
    if(opts.hostname && dados.token){
        const req = https.request(opts, function(response) {
            let data = ''
            response.on('data', function( newData ){
                data += newData
            });
            response.on('end', function(){
                const parsedData = JSON.parse(data);
                let auth = {};
                console.log(opts,dados,parsedData)
                if( parsedData.contratos && parsedData.contratos.length > 0 ) {
                   let contrato = parsedData.contratos[0];
                   auth = {
                      username: contrato.servico_login,
                      password: contrato.servico_senha,
                      wifi_ssid: contrato.servico_wifi_ssid!==""?contrato.servico_wifi_ssid:false,
                      wifi_password: contrato.servico_wifi_password!==""?contrato.servico_wifi_password:false,
                      wifi_ssid_5: contrato.servico_wifi_ssid_5!==""?contrato.servico_wifi_ssid_5:false,
                      wifi_password_5: contrato.servico_wifi_password_5!==""?contrato.servico_wifi_password_5:false,
                      servico_tipo_conexao: contrato.servico_tipo_conexao || "pppoe"
                   };
                }
    
                callback( null, auth );
            });
        }); 

        req.write(JSON.stringify(dados))
        req.end()
    }else{
        callback(null,{})
    }
}
