import React from 'react'


const style = {
    textfield: {
        display: "flex",
        flexDirection: "column"
    },
    label: {
        fontSize: "small",
        fontWeight: "600",
        margin: "4px"
    },
    textarea: {
        minHeight: "160px",
        borderRadius: "5px",
        border: "1px solid #abccf0",
        padding: "5px 10px",
        margin: "5px 4px",
        resize: "vertical"
    }
}

function TextArea(props) {
    return (
        <div className={props.className} style={{...style.textfield}}>
            <label style={{...style.label}} htmlFor={props.name} >{props.name}</label>
            {(props.desc.length > 0)&&<span>{props.desc}</span>}
            <textarea style={{...style.textarea}} disabled={props.awnser || false} name={props.name} type='text' {...props.propsField} defaultValue={props.awnser||props.propsField.defaultValue} />
        </div>
    )
}

export default TextArea;
