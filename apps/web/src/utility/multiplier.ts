import { createSlice } from "@reduxjs/toolkit";

const initialState={
    multiplier:0
}

export const multiplierSlice =createSlice({
    name:'multiplier',
    initialState,
    reducers:{
        updateMultiplier:(state,action)=>{
            state.multiplier=action.payload
        }
    }
})

export const {updateMultiplier} =multiplierSlice.actions

export default multiplierSlice.reducer;