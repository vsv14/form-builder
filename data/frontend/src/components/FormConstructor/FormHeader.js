import React from 'react';
import { useDispatch } from "react-redux";
import {setName} from '../../store/reducers/formSchemaeSlice';
import imgEdit from '../../imgs/edit.svg';




function FormHeader({className, title}) {
    const dispatch = useDispatch();

    return (
        <div className={className}>
            <h4>{title}</h4>
            <img src={imgEdit} alt='Edit form name' onClick={(e)=>{
              dispatch(setName(prompt('New Form Name', "DEFAULT FORM NAME")||"DEFAULT FORM NAME"));
            }}/>
        </div>
    )
}

export default FormHeader
