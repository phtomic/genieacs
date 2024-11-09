import BaseModel, { BaseModelSchemaDefinition, Populator } from "../framework/Domain/Database/Domain/BaseModel";
import { Types } from "mongoose";

interface MapeamentoCachedCPEInterface {
    cpe_id: string,
    mapeamento: Populator<Types.ObjectId>
}

export default new class MapeamentoCachedCPE extends BaseModel<MapeamentoCachedCPEInterface, MapeamentoCachedCPE>{
    public fields: BaseModelSchemaDefinition<MapeamentoCachedCPEInterface> = {
        cpe_id: String,
        mapeamento: {ref: 'genieacs_mapeamentos_cpes', type: Types.ObjectId}
    }
    public collection_name: string = 'genieacs_mapeamento_cached_cpe';
}().load()