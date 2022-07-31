import Repository from './repository.js';
import FormAwnserModel from "./models/formAwnserModel.js";


class FormAwnserRepository extends Repository {
    async create(dto){

        const exist = await this._model.findOne({ user_uuid: dto.user_uuid, form_uuid: dto.form_uuid });
        if(exist !== null) return {msg:"You already answered", formAwnser: null}
        
        const awnser = new this._model(dto);
        const result = await awnser.save();

        return {
            msg: "Awnser saved",
            result
        }
    }

    async findByUUID({user_uuid, form_uuid}){
        const result = await this._model.findOne({ user_uuid, form_uuid });
        
        return {
            msg: result?"FOUND": "NOT FOUND",
            result
        }
    }
}

 const formAwnserRepository = new FormAwnserRepository(FormAwnserModel);

 export default formAwnserRepository;