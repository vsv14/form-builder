import { JSONRPCServer } from 'json-rpc-2.0';
import FormSchemaRepository from '../repository/formSchemaRepository.js';
import FormAwnserRepository from '../repository/formAwnserRepository.js';



const jsonRPCServer = new JSONRPCServer();

jsonRPCServer.addMethod('save-formSchema', async (data)=>{
    const {form_uuid, formSchema} = await JSON.parse(data);
    
    const jsonFormSchema = JSON.stringify(formSchema);
    const result = await FormSchemaRepository.create({form_uuid, formSchema: jsonFormSchema})

    return {
        status: 201,
        ...result
    }
});

jsonRPCServer.addMethod('get-formSchema', async (data)=>{
    const {form_uuid} = await JSON.parse(data);
    const result = await FormSchemaRepository.findByUUID({form_uuid});

    return {
        status: 200,
        ...result
    }
});

jsonRPCServer.addMethod('save-form-awnser', async (data)=>{
    const dto = await JSON.parse(data);
    const result = await FormAwnserRepository.create({...dto});

    return {
        status: 200,
        ...result
    }
});

jsonRPCServer.addMethod('get-form-awnser', async (data)=>{
    const dto = await JSON.parse(data);
    const result = await FormAwnserRepository.findByUUID(dto);

    return {
        status: 200,
        ...result
    }
});

export default jsonRPCServer;