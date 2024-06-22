import { createSlice } from "@reduxjs/toolkit";

const initialState={
    betAmount:0
}

export const payoutSlice=createSlice({
    name:'Payout',
    initialState,
    reducers:{
        updateBetAmount:(state,actions)=>{
            state.betAmount=actions.payload
        }
    }
})

export const {updateBetAmount}=payoutSlice.actions;

export default payoutSlice.reducer;