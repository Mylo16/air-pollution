import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Home from '../components/Home';

const mockStore = configureStore([thunk]);

describe('Home', () => {
  it('should render the pollution data', async () => {
    const store = mockStore({
      pollutants: {
        pollutants: {
          coord: { lon: 1, lat: 7 },
          list: [
            {
              main: { aqi: 1 },
              components: {
                co: 370.5,
                no: 0,
                no2: 0.42,
                o3: 26.46,
                so2: 0.24,
                pm2_5: 5.44,
                pm10: 6.06,
                nh3: 0.33,
              },
              dt: 1685206800,
            },
            {
              main: { aqi: 1 },
              components: {
                co: 367.5,
                no: 0.56,
                no2: 0.98,
                o3: 36.46,
                so2: 30.24,
                pm2_5: 8.44,
                pm10: 60.06,
                nh3: 0.13,
              },
              dt: 1685210400,
            },
          ],
        },
        isloading: false,
        error: false,
      },
      filter: {
        filter: [
          {
            main: { aqi: 1 },
            components: {
              co: 370.5, no: 0, no2: 0.42, o3: 26.46, so2: 0.24, pm2_5: 5.44, pm10: 6.06, nh3: 0.33,
            },
            dt: 1685206800,
          },
          {
            main: { aqi: 1 },
            components: {
              co: 367.5,
              no: 0.56,
              no2: 0.98,
              o3: 36.46,
              so2: 30.24,
              pm2_5: 8.44,
              pm10: 60.06,
              nh3: 0.13,
            },
            dt: 1685210400,
          },
        ],
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>,
    );

    // Assert that the pollutant data is rendered correctly
    expect(screen.getByText('Ghana')).toBeInTheDocument();
  });
});
