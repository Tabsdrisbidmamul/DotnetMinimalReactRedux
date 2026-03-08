import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useAppDispatch } from "../../app/stores/hooks";
import { PolicyType, setFilter } from "./slice/policySlice";
import { useState } from "react";

function PolicyFilter() {
  const dispatch = useAppDispatch();
  const [policyType, setPolicyType] = useState<PolicyType>("All");

  function handleSelectChange(e: Event) {
    const target = (e.target as HTMLSelectElement).value;
    const _policyType = target as PolicyType;
    setPolicyType(_policyType);
    dispatch(setFilter(_policyType));
  }

  return (
    <FormControl>
      <InputLabel id="policy-policy-type-select-label">
        Policy Type Filter
      </InputLabel>
      <Select
        labelId="policy-policy-type-select-label"
        id="policy-policy-type-select"
        value={policyType}
        label="Policy Type"
        onChange={e => {
          // @ts-ignore
          handleSelectChange(e);
        }}
        style={{ marginBottom: "2rem" }}
      >
        <MenuItem defaultChecked value="All">
          All
        </MenuItem>
        <MenuItem value="Health">Health</MenuItem>
        <MenuItem value="Dental">Dental</MenuItem>
        <MenuItem value="Vision">Vision</MenuItem>
      </Select>
    </FormControl>
  );
}

export default PolicyFilter;
