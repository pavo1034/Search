import { createSlice } from "@reduxjs/toolkit"

const dataSlice = createSlice({
    name:"searchdata",
    initialState:{
        data:[]
    },
    reducers:{
      addData:(state,action)=>{
        state.data.push(action.payload)
      },
      clearData:(state,action)=>{
        state.data.length=0;
      }
    }
})

export const {addData,clearData}=dataSlice.actions;
export default dataSlice.reducer;