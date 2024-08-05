import { createSlice } from "@reduxjs/toolkit"

const dataSlice = createSlice({
    name:"searchdata",
    initialState:{
        data:[],
    },
    reducers:{
      addData:(state,action)=>{
        state.data.push(action.payload)
      },
      removeItem:(state,action)=>{
         state.data.splice(action.payload,1)
      },
      clearData:(state,action)=>{
        state.data.length=0;
      },
    }
})

export const {addData,clearData,removeItem}=dataSlice.actions;
export default dataSlice.reducer;