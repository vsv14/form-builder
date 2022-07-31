### Backend сайта: data (data-form-build)
Backend используется для получения статических файлов и ответов на jsonRPC.

Tools:
- cors
- dotenv
- express
- json-rpc-2.0
- mongoose

В качестве БД используется документоориентированная MongoDB.


### Доступные методы
```
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
```


## MongoDB
### Схемы документов
FormSchema
```
const FormSchema = new mongoose.Schema({
    form_uuid: {
        type: String,
        required: true
    },

    formSchema: {
        type: String,
        required: true
    },

    createAt: {
        type: Date,
        default: Date.now
    }
});
```

FormAwnser
```
const FormAwnser = new mongoose.Schema({
    user_uuid: {
        type: String,
        required: true
    },

    form_uuid: {
        type: String,
        required: true
    },

    valueItems: {
        type: [String],
        required: true
    },

    createAt: {
        type: Date,
        default: Date.now
    }
});
```