import { Epic, ofType } from "redux-observable";
import {
  getPolicy,
  getPolicyFailure,
  getPolicySuccess,
  PolicyResponseDTO,
  postPolicy,
  postPolicyFailure,
  postPolicySuccess,
} from "./policySlice";
import {
  catchError,
  debounceTime,
  from,
  map,
  mergeMap,
  of,
  retry,
  timer,
} from "rxjs";
import agent from "../../../app/api/http-agent";
import { PayloadAction } from "@reduxjs/toolkit";

export const getPolicyEpic: Epic = action$ =>
  action$.pipe(
    ofType(getPolicy.type),
    mergeMap(() =>
      from(agent.policies.list()).pipe(
        retry({
          count: 3,
          delay: (_, retryCount) => timer(2 ** retryCount * 1000),
        }),
        map(data => getPolicySuccess(data)),
        catchError(e => of(getPolicyFailure(e.message))),
      ),
    ),
  );

export const createPolicyEpic: Epic = action$ =>
  action$.pipe(
    ofType(postPolicy.type),
    mergeMap((action: PayloadAction<PolicyResponseDTO>) =>
      from(agent.policies.create(action.payload)).pipe(
        debounceTime(300),
        map(data => postPolicySuccess(data as PolicyResponseDTO)),
        catchError((e: Error) => of(postPolicyFailure(e.message))),
      ),
    ),
  );
