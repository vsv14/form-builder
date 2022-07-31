import React, { useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetFormSchema } from '../../store/reducers/formSchemaeSlice';
import { useHttpRequest } from '../../hooks/httpRequest';
import {jsonRPCController} from '../../jsonRPC/jsonRPCController';
import getUUID from 'uuid-by-string';
import {JSONFormat} from '../../utils/jsonFormat';
import '../../styles/form.css';
import Form from './Form';



function FormConstructor() {
    const formSchema = useSelector(state=>state.formSchema);
    const dispatch = useDispatch();
    const { padding } = useHttpRequest();

    const JSONRPCController = useRef(jsonRPCController);
    


    const saveFormSchema = async (e)=>{
      const result = await JSONRPCController.current.saveFormSchema({form_uuid: getUUID(formSchema.name), formSchema});
      toast(result.msg);
    }


    return (
        <div className="form-constructor">
          
          <Form formSchema={formSchema} />

          <div className="controll-panel">
              <button id="form-reset" disabled={padding}  onClick={()=>{
                dispatch(resetFormSchema())
              }}>Reset</button>
              <button disabled={padding} id="form-save" onClick={saveFormSchema}>Save</button>
          </div>

          <div className="json-schema">
            <h3>JSON Schema</h3>
            <pre>
              <div dangerouslySetInnerHTML={{__html: JSONFormat({formSchema:{...formSchema}})}}></div>
            </pre>
          </div>
        </div>
    )
}


export default FormConstructor;
