import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  pollutants: {},
  isLoading: false,
  error: false,
};

const pollutantUrl = 'https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=7.9465&lon=1.0232&appid=6a1f32e305c8c28af274b9534369e2e2';

export const fetchPollutants = createAsyncThunk('pollutants/pollutantsSlice', async () => {
  try {
    const response = await fetch(pollutantUrl);
    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error(e);
  }
});

const pollutantsSlice = createSlice({
  initialState,
  name: 'pollutants',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPollutants.fulfilled, (state, action) => {
      state.pollutants = action.payload;
      state.isLoading = false;
      state.error = false;
    })
      .addCase(fetchPollutants.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPollutants.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default pollutantsSlice.reducer;
