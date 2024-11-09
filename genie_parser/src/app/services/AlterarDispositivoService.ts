
import { getOriginalUrl, request, response } from "../framework/Domain/Routing/Plugins/Session";
import { AxiosController } from "../framework/Domain/Plugins/Axios";
import CachedCPEIndex from "../models/CachedCPEIndex";

export default class AlterarDispositivoService {
    private static axios = new AxiosController()
    private static init() {
        this.axios.setBaseUrl(process.env.GENIEACS_NBI_HOST || `http://localhost:7557`)
    }
    public static encontrar_dispositivo_mapear(): string {
        this.init()
        return getOriginalUrl().toString().match(/(?<=\/devices\/\s*).*?(?=\s*\/tasks)/g)?.[0] || ''
    }

    static async getRouterMap(cpe: any) {
        const cached = await CachedCPEIndex().findOne({ cpe_id: (cpe._id || cpe._deviceId)}).populate('mapeamento')
        if(!cached) return cpe;
        let data = request().body
        cached?.mapeamento?.parses?.forEach((remap: any) => {
            if (data.parameterValues)
                data.parameterValues = data.parameterValues?.map(param => {
                    if (remap.arrayTo) {
                        const dt = param[0].replace(`${remap.arrayTo}.`, '').split('.')
                        const index = dt.shift();
                        const path = dt.join('.')
                        remap.to.forEach((to: any, key: any) => {
                            if (path == to) {
                                param[0] = `${remap.arrayFrom}.${index}.${remap.from[key]}`
                            }
                        })
                    }
                    if (remap.ignore_on_save && remap.ignore_on_save.map((ignored: any) => {
                        const tmpParam = param[0].split('.')
                        return ignored.split('.').map((pointer: any, i: any) => {
                            return (tmpParam[i] !== pointer && pointer !== '*' && tmpParam[i] !== undefined)
                        }).includes(true)
                    }).includes(false)) return false
                    return param
                }).filter((p: any) => p !== false)
        });
        return data
    }
    static to_readable(str: any) { return str.toLowerCase().replace(/ /g, '_') }
    static enviar_dados_acs(body: any){
        this.axios.post(getOriginalUrl(), body, { headers: request().headers }).then(({status,data})=>{
            response().status(status).send(data)
        }).catch(err=>{
            response().status(500).send(err)
        })
    }
}