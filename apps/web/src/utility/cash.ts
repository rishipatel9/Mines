import { createSlice } from "@reduxjs/toolkit";

const initialState={
    cash:0
}

export const cashSlice=createSlice({
    name:"Cash",
    initialState,
    reducers:{
        updateCash:(state,actions)=>{
            state.cash=actions.payload
        }
    }
})

export const {updateCash} = cashSlice.actions

export default cashSlice.reducer;