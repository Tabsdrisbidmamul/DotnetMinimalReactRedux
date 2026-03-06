import { JSX, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/stores/hooks";
import {
  getPolicy,
  selectPolicies,
  selectPolicyError,
  selectPolicyLoading,
} from "./slice/policySlice";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

export default function PolicyTable(): JSX.Element {
  const dispatch = useAppDispatch();
  const policies = useAppSelector(selectPolicies);
  const loading = useAppSelector(selectPolicyLoading);
  const error = useAppSelector(selectPolicyError);

  useEffect(() => {
    dispatch(getPolicy());
  }, [dispatch]);

  function handleClick() {
    dispatch(getPolicy());
  }

  if (loading) return <div>loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box>
      <Button onClick={handleClick} disabled={loading}>
        Get Policies
      </Button>
      <ul>
        {policies.map(policy => (
          <li key={policy.id}>{policy.policyType}</li>
        ))}
      </ul>
    </Box>
  );
}
