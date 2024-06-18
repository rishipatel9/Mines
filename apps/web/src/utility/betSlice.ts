import { createSlice } from "@reduxjs/toolkit";


const initialState={
    bet:false
}

export const betSlice =createSlice({
    name:"bet",
    initialState,
    reducers:{
        isLive:(state)=>{
         state.bet=true;

        },
        toFalse:(state)=>{
            state.bet=false;
        }

    }
})

export const {isLive,toFalse} =betSlice.actions;

export default betSlice.reducer;