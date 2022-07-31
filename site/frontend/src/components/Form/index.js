import React, { useRef } from 'react';
import TextField from './TextField';
import TextArea from './TextArea';
import Select from './Select';
import { jsonRPCController } from '../../jsonRPC/jsonRPCController';
import { toast } from 'react-toastify';
import getUUID from 'uuid-by-string';
import '../../styles/form.css';




const Elements = {
  textField: 'textField',
  textArea: 'textArea',
  select: 'select'
}

export function getFormFieldType(item, awnser=null){
  switch (item.field.type){
      case Elements.textField:
        return (<TextField className={item.field.className} awnser={awnser} name={item.field.label} desc={item.field.description} propsField={{...item.props}}/>);
      case Elements.select:
        return (<Select className={item.field.className} awnser={awnser} name={item.field.label} desc={item.field.description} propsField={{...item.props}}/>);
      case Elements.textArea:
        return (<TextArea className={item.field.className} awnser={awnser} name={item.field.label} desc={item.field.description} propsField={{...item.props}}/>);
      default:
        return (<h3>not support element</h3>);
  }
}



function Form(props) {
  const {formSchema, formUUID, userUUID, awnsers} = props;
  const haveAwnser = awnsers? true:false;
  const JSONRPCController = useRef(jsonRPCController);

  const sendForm = async (e)=>{
    e.preventDefault();

    const form = e.target;

    const valueItems = [];
    const contact = form[form.length-2].value;

    if(contact===''){
      toast('Empty: contact phone');
      return;
    }

    const userUUID = getUUID(contact);

    for (let index = 0; index < form.length-1; index++) {
      if(index < form.length-2){
        valueItems.push(form[index].value);
      }
    }
    const dto = {
      user_uuid: userUUID,
      form_uuid: formUUID,
      valueItems
    }

    const data = await JSONRPCController.current.saveFormAwnser({...dto});
    if(data.result !== null){
      
    }
    toast(data.msg);
  }

    return (
        <div style={{margin: "0"}}>
          {!userUUID && <div className='form-uuid'><span>form UUID: {formUUID}</span></div>}
          {userUUID && <div className='form-uuid'><span>user UUID: {userUUID}</span></div>}
          <div className="container" style={{}}>
            <div className="form-header">
              <h4>{formSchema.name}</h4>
            </div>
            <form action="" onSubmit={sendForm}>
              {formSchema.items.map((item, ind)=>{
                return  <div key={`field-${ind}`} className="form-field-view" style={{margin: "0", padding: "5px 10px"}}>
                            {haveAwnser? getFormFieldType(item, awnsers[ind]):getFormFieldType(item)}
                        </div>                
                })
              }
              {props.children}
            </form>
          </div>
        </div>
    )
}

export default Form