import { createSlice } from "@reduxjs/toolkit";

const initialState={
    multiplier:0
}

export const multiplierSlice =createSlice({
    name:'multiplier',
    initialState,
    reducers:{
        upateMultiplier:(state,action)=>{
            state.multiplier=action.payload
        }
    }
})

export const {upateMultiplier} =multiplierSlice.actions

export default multiplierSlice.reducer;