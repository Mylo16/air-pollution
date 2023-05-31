import filterReducer, { setFilteredTrue } from '../redux/filter/filterSlice';

describe('Detail Slice', () => {
  const initialState = {
    filter: null,
  };

  it('should set pollutantDetail', () => {
    const newState = filterReducer(initialState, setFilteredTrue('pollutant'));
    expect(newState.filter).toEqual('pollutant');
  });
});
