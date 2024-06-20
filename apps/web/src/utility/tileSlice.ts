
import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  clicks: Array(25).fill(false),
};

const tileSlice = createSlice({
  name: 'tiles',
  initialState,
  reducers: {
    addClick(state, action) {
      const { index, value } = action.payload;
      state.clicks[index] = value;
    },
    resetClicks(state) {
      state.clicks = Array(25).fill(false);
    },
  },
});

export const { addClick, resetClicks } = tileSlice.actions;

export default tileSlice.reducer;
