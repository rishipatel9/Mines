
import { configureStore } from "@reduxjs/toolkit";
import minesIndexReducer from "../utility/minesIndexSlice.js";
import betReducer from "../utility/betSlice.js";
import displayAllReducer from "../utility/displayAns.js"
import tileReducer from "../utility/tileSlice.js"
import diamondCountReducer from "../utility/diamondCount.js"
import multiplierReducer from "../utility/multiplier.js";
import payoutReducer from "../utility/payout.js"
import betAmountReducer from "../utility/betAmount.js";

export const store=configureStore({
    reducer:{
        mineIndex:minesIndexReducer,
        bet:betReducer,
        displayAll:displayAllReducer,
        diamondCount: diamondCountReducer,
        tiles: tileReducer,
        multiplier:multiplierReducer,
        payout:payoutReducer,
        betAmount:betAmountReducer
    }
})