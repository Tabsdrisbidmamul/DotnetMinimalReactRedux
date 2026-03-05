import { PolicyResponseDTO, PolicyState, postPolicy } from "./policySlice";
import { of } from "rxjs";
import agent from "../../../app/api/http-agent";
import { createPolicyEpic } from "./policyEpic";
import { AppStore, makeStore } from "../../../app/stores/store";

type LocalTestContext = {
  store: AppStore;
};

const policies: PolicyResponseDTO[] = [
  {
    id: "1",
    customerName: "test",
    policyType: "Health",
    policyStatus: "Active",
    policyStartDate: "2026-03-03T08:35:11.9336044+00:00",
  },
];

describe("post policies epic", function () {
  beforeEach<LocalTestContext>(function (ctx) {
    vi.mock("../../../app/api/http-agent.ts", { spy: true });

    const initialState: PolicyState = {
      policies: [...policies],
      status: "idle",
      filter: "all",
    };

    const store = makeStore({ policies: initialState });
    ctx.store = store;
  });

  it("dispatches success when API returns", function () {
    const action$ = of(
      postPolicy({
        customerName: "test",
        policyStatus: "Active",
        policyType: "Health",
        policyStartDate: "2026-05-03",
      }),
    );

    vi.mocked(agent.policies.create).mockResolvedValue({
      id: "",
      customerName: "test",
      policyStatus: "Active",
      policyType: "Health",
      policyStartDate: "2026-05-03",
    });

    createPolicyEpic(action$, null as any, {}).subscribe((output: any) => {
      expect(output.type).toBe("policies/postPolicySuccess");
      expect(output.payload.customerName).toBe("test");
    });
  });
});
