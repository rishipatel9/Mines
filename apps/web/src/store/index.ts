
import { configureStore } from "@reduxjs/toolkit";
import minesIndexReducer from "../utility/minesIndexSlice.js";
import betReducer from "../utility/betSlice.js";
import displayAllReducer from "../utility/displayAns.js"
import diamondCountReducer from "../utility/diamondCount.js";
import tileReducer from "../utility/tileSlice.js"

export const store=configureStore({
    reducer:{
        mineIndex:minesIndexReducer,
        bet:betReducer,
        displayAll:displayAllReducer,
        diamondCount:diamondCountReducer,
        tiles: tileReducer,
    }
})