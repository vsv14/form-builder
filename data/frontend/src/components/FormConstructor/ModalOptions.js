import React, { useState } from 'react';
import { hiddenModalOptions } from '../../store/reducers/modalOptionSlice';
import { useDispatch, useSelector } from 'react-redux';
import '../../styles/modal.css';
import { changeField} from '../../store/reducers/formSchemaeSlice';




function ModalOptions(props) {
    const currentFieldIndex = useSelector(state=> state.currentField.currentIndex)
    const oldOptions = useSelector(state=> state.formSchema.items[currentFieldIndex]); 
    const dispatch = useDispatch();


    const [field, setField] = useState({...oldOptions.field});
    const [propsField, setPropsField] = useState({...oldOptions.props});

    const addNewOption = (index)=>{
        return {
            nameOption: 'Name option-'+index,
            value: 'value-'+index}; 
    }

    return (
        <div className={props.className}>
            <div className="modal-container" style={{marginTop: `${80 + window.pageYOffset}px`}}>
                <div className="modal-content">
                    <h2>Options</h2>
                    <div className="props">
                        {Object.entries(oldOptions.field).map((prop, ind)=>{
                            return (
                                <div className='prop' key={`field-${ind}`}>
                                    <label htmlFor={prop[1]}>{prop[0]}</label>
                                    {
                                        (ind === 0)?
                                        <span style={{textDecoration: 'underline', paddingLeft: "5px"}}>{prop[1].toLowerCase()}</span>
                                        :
                                        <input type="text" name={prop[1]}
                                            onChange={(e)=>{
                                                const newField = {...field}
                                                newField[prop[0]] = e.target.value
                                                setField({...newField});
                                            }}
                                            value={field[prop[0]]}
                                            placeholder={oldOptions.field[prop[0]]}/>
                                    }
                                </div>
                            )
                        })}

                        <hr/>

                        {Object.entries(propsField).map((prop, i)=>{
                            return (
                                <div className={Array.isArray(prop[1])?'prop-array':'prop'} key={`prop-${i}`}>
                                    <label htmlFor={ Array.isArray(prop[1])?("option"):prop[1]}>{prop[0]}</label>
                                    {
                                        Array.isArray(prop[1])&&oldOptions.field.type==="select"?
                                            <div className="options">
                                                {prop[1].map((option, ind)=>{ if(ind > 0)
                                                    return <div className="option" key={`option-${ind}`}>
                                                        <div className="option-name">
                                                            <label htmlFor={"optionName"+ind}>name option</label>
                                                            <input type="text" onChange={
                                                                    e=>{
                                                                        const newPropsField = {...propsField};
                                                                        const newOptions = [...propsField[prop[0]]];
                                                                        newOptions.splice([ind], 1, { nameOption: e.target.value, value: newPropsField[prop[0]][ind].value });
                                                                        newPropsField[prop[0]] = newOptions;
                                                                        setPropsField(newPropsField);
                                                                    }
                                                                }
                                                                
                                                                placeholder={ind >= oldOptions.props[prop[0]].length ?"undefined":oldOptions.props[prop[0]][ind].nameOption}
                                                                name={"optionName"+ind}/>
                                                        </div>
                                                        <div className="option-value">
                                                            <label htmlFor="">value</label>
                                                            <input type="text" onChange={
                                                                    e=>{
                                                                        const newPropsField = {...propsField};
                                                                        const newOptions = [...propsField[prop[0]]];                                                                  
                                                                        newOptions.splice([ind], 1, {nameOption: newPropsField[prop[0]][ind].nameOption, value: e.target.value});
                                                                        newPropsField[prop[0]] = newOptions;
                                                                        setPropsField(newPropsField);
                                                                    }
                                                                }
                                                                placeholder={ind >= oldOptions.props[prop[0]].length ?"undefined":oldOptions.props[prop[0]][ind].value}
                                                                name={"optionName"+ind}/>
                                                        </div>
                                                        <button id='remove-option'onClick={e=>{
                                                            const newOptions = [...propsField[prop[0]]];
                                                            newOptions.splice(ind, 1);
                                                            const newPropsField = {...propsField};
                                                            newPropsField[prop[0]] = newOptions;
                                                            setPropsField(newPropsField);

                                                        }}>X</button>
                                                    </div>
                                                })}
                                                <div>
                                                    <button className='save' onClick={e=>{
                                                        const newOptions = [...propsField[prop[0]]];
                                                        newOptions.push(addNewOption(newOptions.length));
                                                        const newPropsField = {...propsField};
                                                        newPropsField[prop[0]] = newOptions;
                                                        setPropsField(newPropsField);
                                                    }}>+</button>
                                                </div>
                                            </div>
                                        :
                                        <input type="text" name={prop[1]}
                                            onChange={(e)=>{
                                                const newProps = {...propsField};
                                                newProps[prop[0]] = e.target.value
                                                setPropsField({...newProps});
                                            }}
                                            
                                            value={propsField[prop[0]]} 
                                            placeholder={oldOptions.props[prop[0]]} />
                                    }
                                </div>
                            )
                        })}
                        
                    </div>
                    <div className="cancel-save">
                        <button onClick={()=>{dispatch(hiddenModalOptions())}}>Cancel</button>
                        <button className='save' onClick={()=>{
                            dispatch(changeField({id:currentFieldIndex, item:{field:field, props: propsField}}));
                            dispatch(hiddenModalOptions());
                        }}>Save</button>
                    </div>
                </div>
            </div>            
        </div>
    )
}

export default ModalOptions
