import axios, { AxiosError, AxiosResponse } from "axios"
import { Weather } from "../models/weather"
import { Policy } from "../../features/policies/slice/policySlice"

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

function sleep(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}

const responseBody = <T>(response: AxiosResponse<T>) => response.data

// Capture API errors with interceptor
axios.interceptors.response.use(
  async function (response) {
    if (import.meta.env.DEV) {
      await sleep(5000)
    }

    return response
  },
  function (error: AxiosError) {
    const errorRes = error?.response
    if (!errorRes) {
      console.log("ERROR: failed tp parse error response")
      return Promise.reject(error)
    }

    const { status, config, data, statusText, headers } = errorRes
    switch (errorRes.status) {
      case 400:
        // show an error toast with a friendly message
        if (config.method === "GET") {
          // edge case for 400, show 404 page
          // @ts-ignore
        } else if (data.errors) {
          // go through error object and create an error model
        }
        break
      case 401:
        // redirect to unauthorised page or home page, and log user out from store
        break
      case 404:
        // redirect to 404 page
        break
      case 500:
        // redirect to server error page
        break
    }
  },
)

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const weather = {
  list: () =>
    requests.get<Weather[]>(
      import.meta.env.VITE_WEATHER_FORECAST_GET ?? "/weatherForecast",
    ),
}

const policies = {
  list: () =>
    requests.get<Policy[]>(import.meta.env.VITE_POLICIES ?? "/policies"),
}

const agent = {
  weather,
  policies,
}

export default agent
