import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    name: 'default NoName',
    items: []
}


export const formSchemaSlice = createSlice({
    name:'formSchema',
    initialState,
    reducers: {
        setName: (state, action)=>{
            state.name = action.payload;
        },
        addField: (state, action)=>{
            state.items.push(action.payload);
        },
        deleteField: (state, action)=>{
            state.items.splice(action.payload, 1);
        },
        changeField: (state, action)=>{
            state.items.splice(action.payload.id,1, action.payload.item);
        },
        setFormSchema:(state, action)=>{
            state = {...action.payload};
            return state;
        },
        resetFormSchema: (state, action)=>{
            state = {...initialState};
            return state;
        }
    }
});


export const {setName, addField, deleteField, setFormSchema, resetFormSchema, changeField} = formSchemaSlice.actions;

export const formReducer = formSchemaSlice.reducer;