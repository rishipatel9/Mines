import { createSlice } from "@reduxjs/toolkit";

const initialState={
    minesIndex:[]
}
export const minesIndexSlice=createSlice({
    name:"mineIndex",
    initialState,
    reducers:{
        fillUp:(state,action)=>{
            state.minesIndex=action.payload
        }
    }
})

export const {fillUp} = minesIndexSlice.actions;

export default minesIndexSlice.reducer;