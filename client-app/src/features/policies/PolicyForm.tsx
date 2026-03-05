import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/stores/hooks"
import {
  PolicyStatus,
  PolicyType,
  postPolicy,
  selectPolicyLoading,
} from "./slice/policySlice"
import {
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"

export default function PolicyForm() {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectPolicyLoading)

  const [customerName, setCustomerName] = useState<string>("")
  const [policyType, setPolicyType] = useState<PolicyType>("Health")
  const [policyStatus, setPolicyStatus] = useState<PolicyStatus>("Active")
  const [policyStartDate, setPolicyStartDate] = useState<string>("")

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    dispatch(
      postPolicy({
        customerName,
        policyType,
        policyStatus,
        policyStartDate,
      }),
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <FormControl>
          <TextField
            label={"Customer name"}
            variant="outlined"
            style={{ marginBottom: "2rem" }}
            value={customerName}
            onChange={e => setCustomerName(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <InputLabel id="policy-policy-type-select-label">
            Policy Type
          </InputLabel>
          <Select
            labelId="policy-policy-type-select-label"
            id="policy-policy-type-select"
            value={policyType}
            label="Policy Type"
            onChange={e => setPolicyType(e.target.value)}
            style={{ marginBottom: "2rem" }}
          >
            <MenuItem defaultChecked value="Health">
              Health
            </MenuItem>
            <MenuItem value="Dental">Dental</MenuItem>
            <MenuItem value="Vision">Vision</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="policy-policy-status-select-label">
            Policy Status
          </InputLabel>
          <Select
            labelId="policy-policy-status-select-label"
            id="policy-policy-status-select"
            value={policyStatus}
            label="Policy Status"
            onChange={e => setPolicyStatus(e.target.value)}
            style={{ marginBottom: "2rem" }}
          >
            <MenuItem defaultChecked value="Active">
              Active
            </MenuItem>
            <MenuItem value="Expired">Expired</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <Input
            value={policyStartDate}
            onChange={e => setPolicyStartDate(e.target.value)}
            type="date"
            style={{ marginBottom: "2rem" }}
          />
        </FormControl>

        <FormControl>
          <Button variant="contained" type="submit" disabled={loading}>
            Submit
          </Button>
        </FormControl>
      </FormGroup>
    </form>
  )
}
