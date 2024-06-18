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
        },
        displayNone:(state)=>{
            state.display=false;
        }
    }
})

export const {displayAll,displayNone} = displaySlice.actions

export default displaySlice.reducer;