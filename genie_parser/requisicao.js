const axios = require('axios');
const fs = require('fs');
exports.default = function (body, originalUrl, reqType) {
    let metodo = BuscaMetodo(body, originalUrl, reqType)
    return {
        body: metodo.before ? metodo.before(body) : body,
        after: (dados) => metodo.after ? metodo.after(dados) : dados,
    }
}
function BuscaMetodo(body, originalUrl, reqType) {
    if (originalUrl.includes('/devices') && reqType == 'get') return { after: TratarRespostaConsulta }
    if (originalUrl.includes('/devices') && reqType == 'post' && body.name == 'setParameterValues') return { before: buscaMapeamentoCallback(originalUrl, TratarRespostaSave) }
}
function buscaMapeamentoCallback(url, callback) {
    let [uri] = url.match(/(?<=\/devices\/\s*).*?(?=\s*\/tasks)/g)
    return (body) => callback(uri, body)
}
function TratarRespostaSave(_id, data) {
    let map = getRouterMap({ _id })
    map.forEach(remap => {
        if (remap.arrayTo) {
            data.parameterValues = data.parameterValues.map(param => {
                let dt = param[0].replace(`${remap.arrayTo}.`, '').split('.')
                let index = dt.shift();
                let path = dt.join('.')
                remap.to.forEach((to, key) => {
                    if (path == to) {
                        param[0] = `${remap.arrayFrom}.${index}.${remap.from[key]}`
                    }
                })
                return param
            })
        }
    });
    console.log(data)
}
function TratarRespostaConsulta(data) {
    data.map(cpe => {
        let map = getRouterMap(cpe)
        map.forEach(remap => {
            if (remap.arrayFrom) {
                getArrayValues(cpe, remap.arrayFrom).forEach((attr, key) => {
                    remap.from.forEach((r, i) => {
                        cpe = setObjectValue(cpe, `${remap.arrayTo}.${key}.${remap.to[i]}`, findObject(attr, r))
                    })
                })
            }
        });
        return cpe
    })
    return data
}
function getArrayValues(cpe, arrayFrom) {
    let array = findObject(cpe, arrayFrom)
    let ret = []
    Object.keys(array).map(key => parseInt(key)).filter(value => value).forEach((value) => ret[value] = array?.[value])
    return ret
}
function findObject(obj, index) {
    index.split('.').forEach(objx => {
        obj = obj?.[objx]
    })
    return obj
}
Object.prototype = {

}
function setObjectValue(object, path, value) {
    if (typeof path === 'string') path = path.split('.')
    let tmpPath = path[0]
    if (object[tmpPath] == undefined) object[tmpPath] = {}
    if (path.length == 1) {
        object[tmpPath] = value
    } else {
        path.shift()
        object = {
            ...object,
            [tmpPath]: {
                ...object[tmpPath],
                ...setObjectValue(object[tmpPath], path, value)
            }
        }
    }
    return object
}
function getRouterMap(cpe) {
    let identifier = mapeamentos.default
    if(!fs.existsSync('/tmp/genieparser_map.json')){
        getMapFile()
        return identifier;
    }
    let {mapeamentos,mapeamentos_indices,timeout} = JSON.parse(fs.readFileSync('/tmp/genieparser_map.json', 'utf8'))
    if(timeout>Date.now()) getMapFile()
    let line = []
    if(fs.existsSync('/tmp/genieparser_cachedIds.tmp')) line = fs.readFileSync('/tmp/genieparser_cachedIds.tmp', 'utf8').split('\n').filter(l => l.length > 0).filter(line => line.trim().split('|')[0] == cpe._id)
    if (line.length == 0) {
        let info = cpe._deviceId
        let manufacturer = mapeamentos_indices.manufacturer[to_readable(info._Manufacturer)] || to_readable(info._Manufacturer)
        let productClass = mapeamentos_indices.productClass[to_readable(info._ProductClass)] || to_readable(info._ProductClass)
        identifier = mapeamentos[manufacturer]?.[productClass]
        fs.appendFile('/tmp/genieparser_cachedIds.tmp', `${cpe._id}|${manufacturer}|${productClass}\n`, (err) => { })
    } else {
        let [, manufacturer, productClass] = line[0].split('|')
        identifier = mapeamentos[manufacturer]?.[productClass]
    }

    return identifier
}
function to_readable(str) { return str.toLowerCase().replace(/ /g, '_') }
async function getMapFile(){
    axios.get('https://raw.githubusercontent.com/phtomic/genieacs/main/genieparser_map.json', (err, data) =>{

    })
}