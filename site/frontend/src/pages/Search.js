import React, { useState, useRef } from 'react';
import { jsonRPCController } from '../jsonRPC/jsonRPCController';
import { toast } from 'react-toastify';
import getUUID from 'uuid-by-string';
import '../styles/home.css';
import { useNavigate } from 'react-router-dom';



function Search() {
    const navigate = useNavigate();
    const [formName, setFormName] = useState('');
    const [userContact, setUserContact] = useState('');

    const JSONRPCController = useRef(jsonRPCController);


    const checkFormAwnser = async (e)=>{

        if(formName === '' && userContact === ''){
            toast('Empty fields!');
            return;
        }else if(formName !== '' && userContact === '') {
            const data = await JSONRPCController.current.getFormSchema({form_uuid: getUUID(formName)});
            if(data.result !== null){
                navigate('/form/'+data.result.form_uuid);
                return;
            }
            toast(data.msg);
            return;
        }else if(formName === '' && userContact !== '') {
            toast('Empty Form Name!');
            return;
        }

        const data = await JSONRPCController.current.getFormAwnser({user_uuid: getUUID(userContact), form_uuid: getUUID(formName)});
        if(data.result !== null){
            navigate('/form/'+data.result.form_uuid+'/'+data.result.user_uuid);
            return;
        }
        toast(data.msg);
    }


    return (
        <div className='main-container'>

            <div className='find-form-awnser'>
                <h3>Search form / form awnser</h3>
                <input type="text" onChange={(e)=>setFormName(e.target.value)} placeholder='Name Form'/>
                <input type="text" onChange={(e)=>setUserContact(e.target.value)} placeholder='phone or email user'/>
                <button className='save' onClick={checkFormAwnser}>CHECK</button>
            </div>
        </div>
    )
}

export default Search
