import { createSlice } from "@reduxjs/toolkit";

const initialState={
    display:false
}

export const displaySlice =createSlice({
    name:"DisplayAns",
    initialState,
    reducers:{
        displayAll:(state)=>{
            state.display=true;
        }
    }
})

export const {displayAll} = displaySlice.actions

export default displaySlice.reducer;