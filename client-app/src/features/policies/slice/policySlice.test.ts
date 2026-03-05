import agent from "../../../app/api/http-agent"
import { AppStore, makeStore } from "../../../app/stores/store"
import {
  PolicyResponseDTO,
  policySlice,
  PolicyState,
  selectPolicies,
} from "./policySlice"

type LocalTestContext = {
  store: AppStore
}

const policies: PolicyResponseDTO[] = [
  {
    id: "1",
    customerName: "test",
    policyType: "Health",
    policyStatus: "Active",
    startDate: "2026-03-03T08:35:11.9336044+00:00",
  },
]

describe("policy slice", function () {
  beforeEach<LocalTestContext>(function (ctx) {
    vi.mock("../../../app/api/http-agent.ts", { spy: true })

    const initialState: PolicyState = {
      policies: [...policies],
      status: "idle",
      filter: "all",
    }

    const store = makeStore({ policies: initialState })
    ctx.store = store
  })

  it("should handle initial state", function () {
    expect(policySlice.reducer(undefined, { type: "unknown" })).toStrictEqual({
      policies: [],
      status: "idle",
      filter: "all",
    })
  })

  it<LocalTestContext>("should return policies", function ({ store }) {
    vi.mocked(agent.policies.list).mockResolvedValue(policies)

    const results = selectPolicies(store.getState())
    expect(results).toEqual(store.getState().policies.policies)
  })
})
