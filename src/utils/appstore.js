import { configureStore } from "@reduxjs/toolkit";
import searchDataReducer from "./dataSlice";

const store = configureStore({
    reducer:{
     searchdata:searchDataReducer,
    }
})

export  default store;