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
            console.log(state.minesIndex);
        }
    }
})

export const {fillUp} = minesIndexSlice.actions;

export default minesIndexSlice.reducer;