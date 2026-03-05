import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type Policy = {
  id: string
  customerName: string
  policyType: "Health" | "Dental" | "Vision"
  status: "Active" | "Expired" | "Pending"
  startDate: string
}

export interface PolicyState {
  policies: Policy[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error?: string
  filter: string
}

const initialState: PolicyState = {
  policies: [],
  status: "idle",
  filter: "all",
}

export const policySlice = createSlice({
  name: "policies",
  initialState,
  reducers: create => ({
    setFilter: create.reducer((state, action: PayloadAction<string>) => {
      state.filter = action.payload
    }),
    // get policy
    getPolicy: create.reducer(state => {
      state.status = "loading"
    }),
    getPolicySuccess: create.reducer(
      (state, action: PayloadAction<Policy[]>) => {
        state.status = "succeeded"
        state.policies = action.payload
      },
    ),
    getPolicyFailure: create.reducer((state, action: PayloadAction<string>) => {
      state.status = "failed"
      state.error = action.payload
    }),

    // post policy
    postPolicy: create.reducer((state, _action: PayloadAction<Policy>) => {
      state.status = "loading"
      state.error = undefined
    }),
    postPolicySuccess: create.reducer(
      (state, action: PayloadAction<Policy>) => {
        state.status = "succeeded"
        state.policies.push(action.payload)
      },
    ),
    postPolicyFailure: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.status = "failed"
        state.error = action.payload
      },
    ),
  }),
  selectors: {
    selectPolicies: state => state.policies,
    selectFilter: state => state.filter,
    selectPolicyLoading: state => state.status === "loading",
    selectPoliciesStatus: state => state.status,
    selectPolicyError: state => state.error,
  },
})

export const {
  // get policy
  getPolicy,
  getPolicySuccess,
  getPolicyFailure,

  // post policy
  postPolicy,
  postPolicySuccess,
  postPolicyFailure,

  // filter
  setFilter,
} = policySlice.actions
export const {
  selectFilter,
  selectPolicies,
  selectPoliciesStatus,
  selectPolicyLoading,
  selectPolicyError,
} = policySlice.selectors
