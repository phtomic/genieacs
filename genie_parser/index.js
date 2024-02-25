const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const App = express();
const TratarRequisicao = require("./requisicao").default;
const GENIEPARSER_NBI_PORT = process.env.GENIEPARSER_NBI_PORT || 7557
const endpoint = process.env.GENIEACS_NBI_HOST || `http://localhost:7557`
App.use(bodyParser());
App.use((req, res, next) => {
    console.log(`${endpoint}${req.originalUrl}`)
    let consulta = TratarRequisicao(req.body, req.originalUrl, req.method.toLowerCase())
    axios[req.method.toLowerCase()](`${endpoint}${req.originalUrl}`, consulta.body).then(({ status, data }) => {
        if(status === 200){
            res.status(200).send(consulta.after(data));
        }else{
            res.sendStatus(status || 500)
        }
    }).catch((err) => {
        res.sendStatus(err.response?.status || 500)
    })
})
App.listen(GENIEPARSER_NBI_PORT)