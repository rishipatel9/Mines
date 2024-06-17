import { createSlice } from "@reduxjs/toolkit";

const initialState={
    diamonds:0
}

export const diamondCountSlice=createSlice({
    name:"DiamondCount",
    initialState,
    reducers:{
        update:(state,actions)=>{
            state.diamonds=actions.payload
        }
    }
})

export const {update} = diamondCountSlice.actions

export default diamondCountSlice.reducer