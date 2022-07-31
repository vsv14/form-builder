import React, { useEffect, useRef, useState } from 'react'
import { useHttpRequest } from '../hooks/httpRequest';
import {jsonRPCController} from '../jsonRPC/jsonRPCController';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { getFormFieldType } from '../components/FormConstructor/Form';




function FormView() {
    const { formUUID } = useParams();
    const [ formSchema, setFormSchema] = useState();
    const { padding } = useHttpRequest();

    const JSONRPCController = useRef(jsonRPCController);


    useEffect (()=>{
        const getFormSchema = async () =>{
            const data = await JSONRPCController.current.getFormSchema({form_uuid: formUUID});
            if(data.result !== null){
                setFormSchema(await JSON.parse(data.result.formSchema))
            }
            
            toast(data.msg);
        }

        getFormSchema();

        
    }, [formUUID]);

    return (
        <div className="main-container">
            {formSchema && 
            <div style={{minWidth: "900px", margin:"20px auto"}}>
                <div className='form-uuid'><span>form UUID: {formUUID}</span></div>
                <div className="container" style={{}}>
                    <div className="form-header">
                         <h4>{formSchema.name}</h4>
                    </div>
                    <form action="">
                        {formSchema.items.map((item, ind)=>{
                            return  <div key={`field-${ind}`} className="form-field-view" style={{margin: "0", padding: "5px 10px"}}>
                                        {getFormFieldType(item)}
                                    </div>                
                        })}
                    </form>
                </div>
            </div>}
        </div>
    )
}

export default FormView
