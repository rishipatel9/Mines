
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0, 
};

const diamondCountSlice = createSlice({
  name: 'diamondCount',
  initialState,
  reducers: {
    setDiamondCount: (state, action) => {
      state.count = action.payload;
    },
    updateDiamondCount:(state)=>{
        state.count-=1;
    }
  },
});

export const { setDiamondCount , updateDiamondCount} = diamondCountSlice.actions;

export default diamondCountSlice.reducer;
