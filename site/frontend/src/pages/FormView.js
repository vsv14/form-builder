import React, { useEffect, useRef, useState } from 'react'
import { useHttpRequest } from '../hooks/httpRequest';
import { jsonRPCController } from '../jsonRPC/jsonRPCController';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Form from '../components/Form';




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
                <Form formSchema={formSchema} formUUID={formUUID}>
                    <div className='contact-details'>
                        <label htmlFor='contact-details'>Contact details</label>
                        <input name='contact-details' placeholder='phone or email' type='text'></input>
                        <button type='submit' className='save'>Send</button>
                    </div>
                </Form>
            </div>}
        </div>
    )
}

export default FormView
