import { createSlice } from "@reduxjs/toolkit";

const initialState={
    bet:false
}

export const betSlice =createSlice({
    name:"bet",
    initialState,
    reducers:{
        isLive:(state)=>{
            if(state.bet===false) state.bet=true
            else state.bet=false
            console.log(state.bet)
        }
    }
})

export const {isLive} =betSlice.actions;

export default betSlice.reducer;