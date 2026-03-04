import agent from "../../app/api/http-agent"
import { Weather } from "../../app/models/weather"
import { createAppSlice } from "../../app/stores/createAppSlice"

export type WeatherSliceState = {
  results: Weather[]
  status: "idle" | "loading" | "failed"
}

const initialState: WeatherSliceState = {
  results: [],
  status: "idle",
}

export const weatherSlice = createAppSlice({
  name: "weather",
  initialState,
  reducers: create => ({
    getWeatherAsync: create.asyncThunk(
      async () => {
        const response = await agent.weather.list()
        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.results = action.payload
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
  }),
  selectors: {
    listWeather: state => state.results,
  },
})

export const { getWeatherAsync } = weatherSlice.actions
export const { listWeather } = weatherSlice.selectors
