import { createSlice } from "@reduxjs/toolkit";

const initialState={
    diamonds:0
}

export const diamondCountSlice=createSlice({
    name:"DiamondCount",
    initialState,
    reducers:{
        setDiamondCount:(state,actions)=>{
            console.log(actions.payload)
            state.diamonds=actions.payload
            console.log("state.diamond",state.diamonds)
        },
    }
})

export const {setDiamondCount} = diamondCountSlice.actions

export default diamondCountSlice.reducer