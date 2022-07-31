import React from 'react';
import { useDispatch } from 'react-redux';
import { Elements, getElementProps, SidebarElements } from './sidebarElements';
import { addField } from '../../store/reducers/formSchemaeSlice';
import { setType } from '../../store/reducers/itemSidebarSlice';
import imgSelect from '../../imgs/select.svg';
import imgTextField from '../../imgs/text-field.svg';
import imgTextArea from '../../imgs/text-area.svg';



function getImg(type){
  switch(type){
    case Elements.textField:
            return imgTextField;
        case Elements.textArea:
            return imgTextArea;
        case Elements.select:
            return imgSelect;
        default:
            return '';
  }
}


function Sidebar() {
    const dispatch = useDispatch();

    const onDragStartSbItem = (e, type)=>{
        e.target.style.opacity = 0.7;
        e.dataTransfer.effectAllowed = "move";
        dispatch(setType(type));
      }
    
      const onDragEndSbItem = async (e, field)=>{
        e.target.style.opacity = 1;
        if(e.dataTransfer.dropEffect !== 'none'){
          dispatch(addField({field:{type: field.type, label: field.label, description: 'default description', className: ''}, props: getElementProps(field.type)}));
        }
      }

    return (
        <div className="tools-sidebar">
          <p>
            To add, drag element to form area.
          </p>
          <h4>Basic</h4>
          <hr />
          <div className="elements-container">
            {SidebarElements.map(item=>{
              return (
                <div className="element" id={item.type} key={item.type} draggable onDragStart={(e)=>onDragStartSbItem(e)} onDragEnd={(e) =>onDragEndSbItem(e, item)} >
                  <img src={getImg(item.type)} alt="" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
    )
}

export default Sidebar;