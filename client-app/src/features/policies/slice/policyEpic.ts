import { ofType } from "redux-observable"
import { getPolicy, getPolicyFailure, getPolicySuccess } from "./policySlice"
import { catchError, from, map, mergeMap, Observable, of } from "rxjs"
import agent from "../../../app/api/http-agent"

export function getPolicyEpic(action$: Observable<unknown>) {
  return action$.pipe(
    ofType(getPolicy.type),
    mergeMap(() =>
      from(agent.policies.list()).pipe(
        map(data => getPolicySuccess(data)),
        catchError(e => of(getPolicyFailure(e.message))),
      ),
    ),
  )
}
