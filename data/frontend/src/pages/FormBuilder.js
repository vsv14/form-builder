import React from 'react'
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import FormConstructor from '../components/FormConstructor';
import ModalOptions from '../components/FormConstructor/ModalOptions';



function FormBuilder() {
    const showModal = useSelector(state=>state.modalOptions.show);


    return (
        <div className="main-container builder-container">
            <Sidebar/>
            <FormConstructor/>
            {showModal&&<ModalOptions className="modal-form-field-options"/>}
      </div>
    )
}

export default FormBuilder
