import { configureStore } from "@reduxjs/toolkit";
import { currentFieldReducer } from "./reducers/currentFieldSlice";
import { formReducer } from "./reducers/formSchemaeSlice";
import { sidebarReducer } from "./reducers/itemSidebarSlice";
import { modalOptionsReducer } from "./reducers/modalOptionSlice";



export const store = configureStore({
    reducer: {
        formSchema: formReducer,
        sidebar: sidebarReducer,
        currentField: currentFieldReducer,
        modalOptions: modalOptionsReducer
    }
});

