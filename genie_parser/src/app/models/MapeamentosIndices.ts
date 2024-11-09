import BaseModel, { BaseModelSchemaDefinition, Populator } from "../framework/Domain/Database/Domain/BaseModel";
import { Types } from "mongoose";

interface MapeamentoIndiceInterface {
    manufacturer: { [x: string]: string }
    productClass: { [x: string]: string }
    version: { [x: string]: string }
    hardware: { [x: string]: string }
    mapeamento: Populator<Types.ObjectId>
}

export default new class MapeamentosIndices extends BaseModel<MapeamentoIndiceInterface, MapeamentosIndices>{
    public fields: BaseModelSchemaDefinition<MapeamentoIndiceInterface> = {
        manufacturer: Object,
        productClass: Object,
        version: Object,
        hardware: Object,
        mapeamento: {ref: 'genieacs_mapeamentos_cpes', type: Types.ObjectId}
    }
    public collection_name: string = 'genieacs_mapeamentos_indices';
}().load()