import mongoose, { Document, FilterQuery, UpdateQuery, IfAny, Model, PopulatedDoc, Require_id, SchemaDefinition, SchemaDefinitionType, Types } from "mongoose";
import { Schema } from "mongoose";
import DatabaseSchemaPlugin, { ConnectDatabase } from "./DatabaseSchemaPlugin";
export type Populator<T = any> = PopulatedDoc<T, any>;
export type BaseModelListener = {
    onDelete?: Array<(doc: any) => void>;
    onUpdate?: Array<(doc: any) => void>;
    onCreate?: Array<(doc: any) => void>;
};
type ModelType<T, M> = T &
    BaseModel<T, {}> &
    Model<T, {}, {}, {},
        IfAny<T, any, Document<unknown, {}, T> & Require_id<T>>,
        any> & M;
export type BaseModelSchemaDefinition<T> = SchemaDefinition<SchemaDefinitionType<T>, any>;
export class PasswordString extends Schema.Types.String { };
export type DBPlugins = Array<(schema: mongoose.Schema<any>, opts: any) => any>
export default class BaseModel<T, ModelMethods = {}> {
    public readonly fields!: BaseModelSchemaDefinition<T>;
    public readonly collection_name!: string;
    readonly ignoreDefaultFields?: boolean;
    protected readonly ignoredFields?: string[];
    readonly ignoredFieldsAudit?: string[];
    protected readonly audit_fields: Array<[string, string, string]> = []
    protected plugins: DBPlugins = []
    protected beforeSave?: ((dados: any) => any);
    protected readonly listeners!: BaseModelListener;
    protected model!: ModelType<T, ModelMethods>;
    public load(): () => ModelType<T, ModelMethods> {
        const methods = [
            ...Reflect.ownKeys(Object.getPrototypeOf(this)),
            ...Reflect.ownKeys(BaseModel.prototype)
        ].filter((p: any) => !['constructor'].includes(p))
        
        if (!this.model) this.model = build<T, T & BaseModel<T> & ModelMethods>(
            this,
            methods.map((method) => ([method.toString(), (...args: any[]) =>  this[method.toString()](...args)]))
        );
        return (type = 'main') => {
            ConnectDatabase(type)
            return this.model
        }
    }
    async isEmpty() {
        return await this.model.findOne({}) ? false : true
    }
    public findAll() {
        return this.model.find({})
    }
    public findLimit(query: FilterQuery<T>, limit: number) {
        return this.model.find(query).limit(limit)
    }
    public count(query: FilterQuery<T>) {
        return this.model.countDocuments(query)
    }
    public async updateOrCreate(query: FilterQuery<T>, update: UpdateQuery<T>) {
        return await this.model.find(query) ?
            await this.model.updateOne(query, update).exec() :
            await this.model.create(update);
    }
    public findById(id: Types.ObjectId) {
        return this.model.find({ _id: id });
    }

    public deleteById(_id: Types.ObjectId | string) {
        return this.model.deleteOne({ _id }).exec()
    }
    //findById
    public whereId(id: Types.ObjectId) {
        return this.model.find({ _id: id });
    }
}

function build<T, ModMethods>(schema: BaseModel<any>, methods: Array<[string, any]>) {
    const nSchema = new mongoose.Schema<T>({
        ...schema.fields,
        created: Date,
        updated: Date
    })
    if (nSchema.plugin) nSchema.plugin(DatabaseSchemaPlugin, {
        ...schema,
        omit: [
            ...schema.ignoreDefaultFields ? ['_id', 'created', 'updated'] : [],
            ...schema.ignoredFieldsAudit || []
        ]
    })
    methods.forEach(k => nSchema.static(k[0], (...args) => k[1](...args)))
    return (mongoose.models[schema.collection_name] || mongoose.model(schema.collection_name, nSchema)) as ModMethods & Model<T>
}