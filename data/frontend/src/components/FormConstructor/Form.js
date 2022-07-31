import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormHeader from './FormHeader';
import FormField from './FormField';
import getUUID from 'uuid-by-string';
import {Elements} from '../Sidebar/sidebarElements';
import {TextField, TextArea, Select} from './FormField'



export function getFormFieldType(item){
  switch (item.field.type){
      case Elements.textField:
        return (<TextField className={item.field.className} name={item.field.label} desc={item.field.description} propsField={{...item.props}}/>);
      case Elements.select:
        return (<Select className={item.field.className} name={item.field.label} desc={item.field.description} propsField={{...item.props}}/>);
      case Elements.textArea:
        return (<TextArea className={item.field.className} name={item.field.label} desc={item.field.description} propsField={{...item.props}}/>);
      default:
        return (<h3>not support element</h3>);
  }
}



function Form({formSchema}) {
  const history = useNavigate();

  const findForm = ()=>{
    history('/builder/'+getUUID(formSchema.name));
  }

    return (
        <div>
            <div className='form-uuid' onClick={()=>{findForm()}}><span>form UUID: {getUUID(formSchema.name)}</span></div>
            <div className="container" onDragOver={(e)=>{ e.preventDefault(); e.dataTransfer.dropEffect = "move"}}>
            <FormHeader className="form-header" title={formSchema.name}/>

            <form action="" >
              {formSchema.items.map((item, ind)=>{
                return <FormField key={`field-${ind}`} className={item.props.className} label={item.field.label} indexPos={ind}>{getFormFieldType(item)}</FormField>                
              })}
            </form>
          </div>
        </div>
    )
}

export default Form