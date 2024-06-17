import { createSlice } from "@reduxjs/toolkit";


const initialState={
    bet:false
}

export const betSlice =createSlice({
    name:"bet",
    initialState,
    reducers:{
        isLive:(state,action)=>{
            state.bet=action.payload
        }
    }
})

export const {isLive} =betSlice.actions;

export default betSlice.reducer;