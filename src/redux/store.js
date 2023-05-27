import { configureStore } from '@reduxjs/toolkit';
import pollutantsReducer, { fetchPollutants } from './pollutants/pollutantsSlice';
import detailsReducer from './details/detailsSlice';
import filterReducer from './filter/filterSlice';

const store = configureStore({
  reducer: {
    pollutants: pollutantsReducer,
    details: detailsReducer,
    filter: filterReducer,
  },
});

store.dispatch(fetchPollutants());
export default store;
