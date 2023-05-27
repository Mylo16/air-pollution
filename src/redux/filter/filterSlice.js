import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: [],
};

const filterSlice = createSlice({
  initialState,
  name: 'filter',
  reducers: {
    setFilteredTrue: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setFilteredTrue } = filterSlice.actions;
export default filterSlice.reducer;
