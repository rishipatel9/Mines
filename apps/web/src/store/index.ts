
import { configureStore } from "@reduxjs/toolkit";
import minesIndexReducer from "../utility/minesIndexSlice.js";
import betReducer from "../utility/betSlice.js";

export const store=configureStore({
    reducer:{
        mineIndex:minesIndexReducer,
        bet:betReducer
    }
})