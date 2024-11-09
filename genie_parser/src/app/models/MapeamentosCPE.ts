import BaseModel, { BaseModelSchemaDefinition, Populator } from "../framework/Domain/Database/Domain/BaseModel";
import { Types } from "mongoose";

interface MapeamentoCPEInterface {
    parses: Array<{
        from: Array<string>,
        to: Array<string>,
        arrayFrom?: string,
        arrayTo?: string,
        ignore_on_save?: Array<string>
      }>
}

export default new class MapeamentoCPE extends BaseModel<MapeamentoCPEInterface, MapeamentoCPE>{
    public fields: BaseModelSchemaDefinition<MapeamentoCPEInterface> = {
        parses: Object,
    }
    public collection_name: string = 'genieacs_mapeamento_cpe';
}().load()