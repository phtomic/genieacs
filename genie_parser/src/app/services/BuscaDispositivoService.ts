import { Axios, AxiosResponse } from "axios";
import { getOriginalUrl, request, response } from "../framework/Domain/Routing/Plugins/Session";
import { AxiosController } from "../framework/Domain/Plugins/Axios";
import MapeamentosIndices from "../models/MapeamentosIndices";
import CachedCPEIndex from "../models/CachedCPEIndex";

export default class BuscaDispositivoService {
    private static axios = new AxiosController()
    private static init() {
        this.axios.setBaseUrl(process.env.GENIEACS_NBI_HOST || `http://localhost:7557`)
    }
    public static async encontrar_dispositivo_mapear(): Promise<AxiosResponse> {
        this.init()
        return await this.axios.get(getOriginalUrl(), { headers: request().headers })
    }
    public static async mapear_dispositivo(dispositivos: any) {
        const cached = await CachedCPEIndex().find({ cpe_id: dispositivos.map((cpe: any) => cpe._id || cpe._deviceId) }).populate('mapeamento')
        return await Promise.all(dispositivos.map(async (cpe: any) => {
            const m = await this.getRouterMap(cpe, cached)
            if (!m) return cpe;
            m.mapeamento?.parses?.forEach((remap: any) => {
                if (remap.arrayFrom) this.getArrayValues(cpe, remap.arrayFrom).forEach((attr: any, key: any) => {
                    remap.from.forEach((attr2: any, i: any) => {
                        cpe = this.setObjectValue(cpe, `${remap.arrayTo}.${key}.${remap.to[i]}`, this.findObject(attr, attr2))
                    })
                })
            });
            return cpe
        }))
    }

    static async getRouterMap(cpe: any, mapeamento_cached) {
        const map_cache = mapeamento_cached.find(({ cpe_id }) => (cpe._id || cpe._deviceId) == cpe_id)
        if (map_cache) return map_cache
        const mapeamento = await MapeamentosIndices().findOne({
            manufacturer: this.to_readable(cpe._deviceId._Manufacturer),
            productClass: this.to_readable(cpe._deviceId._ProductClass)
        }).populate('mapeamento')
        await CachedCPEIndex().create({
            manufacturer: this.to_readable(cpe._deviceId._Manufacturer),
            productClass: this.to_readable(cpe._deviceId._ProductClass),
            mapeamento: mapeamento?.mapeamento?._id || mapeamento?.mapeamento
        })
        return mapeamento
    }

    static findObject(obj: any, index: any) {
        index.split('.').forEach((objx: any) => {
            obj = obj?.[objx]
        })
        return obj
    }
    private static getArrayValues(cpe: any, arrayFrom: any) {
        let array = this.findObject(cpe, arrayFrom)
        let ret: any = []
        Object.keys(array).map(key => parseInt(key)).filter(value => value).forEach((value) => ret[value] = array?.[value])
        return ret
    }
    static setObjectValue(object: any, path: any, value: any) {
        if (typeof path === 'string') path = path.split('.')
        let tmpPath = path[0]
        if (object[tmpPath] == undefined) object[tmpPath] = {}
        if (path.length == 1) {
            object[tmpPath] = value
        } else {
            path.shift()
            return {
                ...object,
                [tmpPath]: {
                    ...object[tmpPath],
                    ...this.setObjectValue(object[tmpPath], path, value)
                }
            };
        }
        return object
    }
    static to_readable(str: any) { return str.toLowerCase().replace(/ /g, '_') }
}