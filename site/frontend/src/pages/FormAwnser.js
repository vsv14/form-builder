import React, { useEffect, useRef, useState } from 'react'
import { useHttpRequest } from '../hooks/httpRequest';
import {jsonRPCController} from '../jsonRPC/jsonRPCController';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Form from '../components/Form';




function FormAwnser() {
    const { formUUID, userUUID } = useParams();
    const [ formSchema, setFormSchema] = useState();
    const [ awnsers, setAwnsers ] = useState();
    const { padding } = useHttpRequest();

    const JSONRPCController = useRef(jsonRPCController);


    useEffect (()=>{
        const getFormSchema = async () =>{
            const data = await JSONRPCController.current.getFormSchema({form_uuid: formUUID});
            if(data.result !== null){
                const form_schema = JSON.parse(data.result.formSchema);
                setFormSchema(form_schema);
            }
        };

        const getAwnsers = async () =>{
            const data = await JSONRPCController.current.getFormAwnser({user_uuid: userUUID, form_uuid: formUUID});
            if(data.result !== null){
                setAwnsers(data.result);
                console.log(data.result);
            }
            toast(data.msg);
        };

        getFormSchema();
        getAwnsers();  

    }, [formUUID, userUUID]);

    return (
        <div className="main-container">
            {formSchema && 
            <div style={{minWidth: "900px", margin:"20px auto"}}>
                <Form formSchema={formSchema} formUUID={formUUID} userUUID={userUUID} awnsers={awnsers?.valueItems}>
                    {awnsers && <div className='date-create'>{awnsers.createAt}</div>}
                </Form>
            </div>}
        </div>
    )
}

export default FormAwnser
