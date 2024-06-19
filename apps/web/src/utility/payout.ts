import { createSlice } from "@reduxjs/toolkit";

const initialState={
    payout:0
}

export const payoutSlice=createSlice({
    name:'Payout',
    initialState,
    reducers:{
        updatePayout:(state,actions)=>{
            state.payout=actions.payload
        }
    }
})

export const {updatePayout}=payoutSlice.actions;

export default payoutSlice.reducer;