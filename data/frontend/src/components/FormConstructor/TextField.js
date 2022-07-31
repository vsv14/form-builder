import React from 'react'


const style = {
    textfield: {
        display: "flex",
        flexDirection: "column",
    },
    label: {
        fontSize: "small",
        fontWeight: "600",
        margin: "4px"
    },
    input: {
        height: "30px",
        borderRadius: "5px",
        border: "1px solid #abccf0",
        padding: "0 10px",
        margin: "5px 4px"
    }
}

function TextField(props) {
    return (
        <div className={props.className} style={{...style.textfield}}>
            <label style={{...style.label}} htmlFor={props.name} >{props.name}</label>
            {(props.desc.length > 0)&&<span>{props.desc}</span>}
            <input style={{...style.input}} name={props.name} type='text' {...props.propsField}/>                   
        </div>
    )
}

export default TextField;
