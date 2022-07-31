import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentIndex: -1
}


export const currentFieldSlice = createSlice({
    name:'currnetField',
    initialState,
    reducers: {
        setCurrentIndexField: (state, action)=>{
            state.currentIndex = action.payload;
        },
    }
});


export const {setCurrentIndexField} = currentFieldSlice.actions;

export const currentFieldReducer = currentFieldSlice.reducer;