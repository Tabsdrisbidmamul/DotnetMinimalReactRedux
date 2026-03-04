import { AppStore, makeStore } from '../../app/stores/store';
import { weatherSlice, WeatherSliceState, listWeather as selectWeather } from './weatherSlice';
import { vi, describe, it, expect } from 'vitest';
import agent from '../../app/api/http-agent';

type LocalTestContext = {
  store: AppStore;
};

describe('weather slice', () => {
  beforeEach<LocalTestContext>((ctx) => {
    vi.mock('../../app/api/http-agent.ts', { spy: true });

    const initialState: WeatherSliceState = {
      results: [
        {
          date: '2026-03-03',
          temperatureC: 41,
          summary: 'Hot',
          temperatureF: 105,
        },
        {
          date: '2026-03-04',
          temperatureC: 16,
          summary: 'Warm',
          temperatureF: 60,
        },
        {
          date: '2026-03-05',
          temperatureC: -14,
          summary: 'Cool',
          temperatureF: 7,
        },
        {
          date: '2026-03-06',
          temperatureC: 36,
          summary: 'Mild',
          temperatureF: 96,
        },
        {
          date: '2026-03-07',
          temperatureC: 21,
          summary: 'Hot',
          temperatureF: 69,
        },
      ],
      status: 'idle',
    };

    const store = makeStore({ weather: initialState });
    ctx.store = store;
  });

  it('should handle initial state', function () {
    expect(weatherSlice.reducer(undefined, { type: 'unknown' })).toStrictEqual({
      results: [],
      status: 'idle',
    });
  });

  it<LocalTestContext>('should return weather forecasts', function ({ store }) {
    vi.mocked(agent.weather.list).mockResolvedValue(store.getState().weather.results);

    const results = selectWeather(store.getState());

    expect(results).toEqual(store.getState().weather.results);
  });
});
