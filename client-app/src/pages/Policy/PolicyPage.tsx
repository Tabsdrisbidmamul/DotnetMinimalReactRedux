import { Box } from "@mui/material";
import PolicyFilter from "../../features/policies/PolicyFilter";
import PolicyForm from "../../features/policies/PolicyForm";
import PolicyTable from "../../features/policies/PolicyTable";

function PolicyPage() {
  return (
    <Box>
      <PolicyFilter />
      <PolicyTable />
      {/* <PolicyForm /> */}
    </Box>
  );
}

export default PolicyPage;
