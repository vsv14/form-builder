import React from 'react'


const style = {
    textfield: {
        display: "flex",
        flexDirection: "column",
    },
    label: {
        fontSize: "small",
        fontWeight: "600",
        height:"fit-content",
        margin: "auto 4px"
    },
    select: {
        height: "30px",
        borderRadius: "5px",
        border: "1px solid #ced3d7",
        backgroundColor: "#f1f6f9",
        padding: "0 10px"
    }
}

function Select(props) {

    return (
        <div className={props.className} style={{...style.textfield}}>
            <label style={{...style.label}} htmlFor={props.name} >{props.name}</label>
            {(props.desc.length > 0)&&<span>{props.desc}</span>}
            <select style={{...style.select}} disabled={props.awnser || false} name={props.name} type='text' className= {props.propsField.className}  defaultValue={props.awnser||props.propsField.defaultValue}>
                {
                    props.propsField.options.map((option, ind)=>{
                        return <option key={`option-${ind}`} value={option.value}>{option.nameOption}</option>;
                    })
                }
            </select>                   
        </div>
    )
}

export default Select;
