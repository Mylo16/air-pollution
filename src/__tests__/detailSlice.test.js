import detailsReducer, { detailedPollutant, clearPollutant } from '../redux/details/detailsSlice';

describe('Detail Slice', () => {
  const initialState = {
    details: null,
  };

  it('should set pollutantDetail', () => {
    const newState = detailsReducer(initialState, detailedPollutant('pollutant'));
    expect(newState.details).toEqual('pollutant');
  });

  it('should clear pollutantDetail', () => {
    const currentState = {
      details: 'pollutant',
    };
    const newState = detailsReducer(currentState, clearPollutant());
    expect(newState.details).toBeNull();
  });
});
