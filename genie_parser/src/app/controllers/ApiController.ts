
import BuscaDispositivoService from "../services/BuscaDispositivoService";
import AlterarDispositivoService from "../services/AlterarDispositivoService";
import { request, response } from "../framework/Domain/Routing/Plugins/Session";

export default class ApiController{
    public async buscar_dispositivo(){
        const dispotivos = await BuscaDispositivoService.encontrar_dispositivo_mapear();
        response().send(await BuscaDispositivoService.mapear_dispositivo(dispotivos))
    }

    public async alterar_dispositivo(){
        const dispotivo_id = AlterarDispositivoService.encontrar_dispositivo_mapear();
        let body = request().body
        if(body.name == 'setParameterValues'){
            body = await AlterarDispositivoService.getRouterMap(dispotivo_id)
        }
        AlterarDispositivoService.enviar_dados_acs(body)
    }
}