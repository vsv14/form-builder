import React, { useState } from 'react';
import TextField from './TextField';
import TextArea from './TextArea';
import Select from './Select';
import { useDispatch } from 'react-redux';
import { showModalOptions} from '../../store/reducers/modalOptionSlice';
import { setCurrentIndexField } from '../../store/reducers/currentFieldSlice';
import { deleteField } from '../../store/reducers/formSchemaeSlice';
import imgEdit from '../../imgs/edit.svg';
import imgDelete from '../../imgs/delete.svg';


const style = {
    form_field_edit: {
        position:"absolute",
        display: "flex",
        flexDirection: "row",
        right: "8px",
        margin: "0px"
    }
}

function FormField(props) {
    const [showEditor, setShowEditor] = useState(false);
    const dispatch = useDispatch();

    return (
        <div className={"form-field"} 
            onMouseEnter={(e)=>{setShowEditor(true)}}
            onMouseLeave={(e)=>{setShowEditor(false)}}>

            {
                showEditor && <div className="form-field-edit" style={{...style.form_field_edit}}>
                    <img onClick={
                        ()=>{
                            dispatch(setCurrentIndexField(props.indexPos))
                            dispatch(showModalOptions());
                        }}
                        src={imgEdit} alt='edit button'/>

                    <img onClick={
                        ()=>{
                            dispatch(deleteField(props.indexPos));
                        }}
                        src={imgDelete} alt='delete button'/>
                </div>
            }
            {props.children}
        </div>
    )
}

export default FormField

export {
    TextField,
    TextArea,
    Select
}
