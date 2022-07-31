import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    show:false
}


export const modalOptionsSlice = createSlice({
    name:'modalOptions',
    initialState,
    reducers: {
        showModalOptions: (state)=>{
            state.show = true;
        },
        hiddenModalOptions: (state)=>{
            state.show = false;
        }
    }
});


export const {showModalOptions, hiddenModalOptions} = modalOptionsSlice.actions;

export const modalOptionsReducer = modalOptionsSlice.reducer;