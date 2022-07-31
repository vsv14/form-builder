import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    current: 'none'
}


export const itemSidebarSlice = createSlice({
    name:'sidebar',
    initialState,
    reducers: {
        setType: (state, action)=>{
            state.current = action.payload;
        }
    }
});


export const {setType, inForm} = itemSidebarSlice.actions;

export const sidebarReducer = itemSidebarSlice.reducer;