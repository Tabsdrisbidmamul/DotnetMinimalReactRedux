import {
  Action,
  combineSlices,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { weatherSlice } from "../../features/weather/weatherSlice";
import { policySlice } from "../../features/policies/slice/policySlice";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import {
  createPolicyEpic,
  getPolicyEpic,
} from "../../features/policies/slice/policyEpic";

const rootReducer = combineSlices(weatherSlice, policySlice);
export type RootState = ReturnType<typeof rootReducer>;

const rootEpic = combineEpics(getPolicyEpic, createPolicyEpic);

const epicMiddleware = createEpicMiddleware();

export function makeStore(preloadedState?: Partial<RootState>) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(epicMiddleware),
    preloadedState,
  });

  epicMiddleware.run(rootEpic);

  return store;
}

export const store = makeStore();

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
