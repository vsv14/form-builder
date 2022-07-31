import getNewJsonRPCClient from "./jsonRPCClient";
import JSONRPCMethods from "./jsonRPCMethods";



export default class JSONRPCController {
    #jsonRPCClient;

    constructor(jsonRPCClient){
        this.#jsonRPCClient = jsonRPCClient;
    
    }

    async callMethod(jsonRPCMethod, dto){
        return await this.#jsonRPCClient.request(jsonRPCMethod, JSON.stringify(dto))
        .then((result) => {
            return result
        });
    }

    saveFormSchema(dto){
        return this.callMethod(JSONRPCMethods.saveFormSchema, dto);
    }

    getFormSchema(dto){
        return this.callMethod(JSONRPCMethods.getFormSchema, dto);
    }

    saveFormAwnser(dto){
        return this.callMethod(JSONRPCMethods.saveFormAwnser, dto);
    }

    getFormAwnser(dto){
        return this.callMethod(JSONRPCMethods.getFormAwnser, dto);
    }
}


const jsonRPCURL = "http://localhost:5000/json-rpc";
export const jsonRPCController = new JSONRPCController(getNewJsonRPCClient(jsonRPCURL));