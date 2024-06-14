import { configureStore } from "@reduxjs/toolkit";
import minesIndexReducer from "../utility/minesIndexSlice.js";

export const store=configureStore({
    reducer:{
        mineIndex:minesIndexReducer
    }
})