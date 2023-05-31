import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  details: null,
};

const detailsSlice = createSlice({
  initialState,
  name: 'details',
  reducers: {
    detailedPollutant: (state, action) => {
      state.details = action.payload;
    },
    clearPollutant: (state) => {
      state.details = null;
    },
  },
});

export const { detailedPollutant, clearPollutant } = detailsSlice.actions;
export default detailsSlice.reducer;
