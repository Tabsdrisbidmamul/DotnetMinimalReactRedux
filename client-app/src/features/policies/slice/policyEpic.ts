import { Epic, ofType } from "redux-observable"
import {
  getPolicy,
  getPolicyFailure,
  getPolicySuccess,
  Policy,
  postPolicy,
  postPolicyFailure,
  postPolicySuccess,
} from "./policySlice"
import { catchError, from, map, mergeMap, Observable, of } from "rxjs"
import agent from "../../../app/api/http-agent"
import { PayloadAction } from "@reduxjs/toolkit"

export const getPolicyEpic: Epic = (action$: Observable<unknown>) =>
  action$.pipe(
    ofType(getPolicy.type),
    mergeMap(() =>
      from(agent.policies.list()).pipe(
        map(data => getPolicySuccess(data)),
        catchError(e => of(getPolicyFailure(e.message))),
      ),
    ),
  )

export const createPolicyEpic: Epic = (action$: Observable<unknown>) =>
  action$.pipe(
    ofType(postPolicy.type),
    mergeMap((action: PayloadAction<Policy>) =>
      from(agent.policies.create(action.payload)).pipe(
        map(data => postPolicySuccess(data as Policy)),
        catchError((e: Error) => of(postPolicyFailure(e.message))),
      ),
    ),
  )
