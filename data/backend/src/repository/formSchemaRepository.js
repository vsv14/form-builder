import Repository from './repository.js';
import FormSchemaModel from "./models/formSchemaModel.js";


class FormSchemaRepository extends Repository {
    async create(dto){

        const exist = await this._model.findOne({ form_uuid: dto.form_uuid });
        if(exist !== null) return {msg:"FormSchema already exists", formSchema: null}
        
        const newSchema = new this._model(dto);
        const result = await newSchema.save();

        return {
            msg: "FormSchema saved",
            result
        }
    }

    async findByUUID({form_uuid}){
        const result = await this._model.findOne({ form_uuid });
        
        return {
            msg: result?"FOUND": "NOT FOUND",
            result
        }
    }
}

 const formSchemaRepository = new FormSchemaRepository(FormSchemaModel);

 export default formSchemaRepository;