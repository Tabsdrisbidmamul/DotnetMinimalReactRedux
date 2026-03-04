import { useAppDispatch } from "../../app/stores/hooks"
import { setFilter } from "./slice/policySlice"

function PolicyFilter() {
  const dispatch = useAppDispatch()

  return (
    <label>
      Filter by Status:
      <select
        onChange={e => dispatch(setFilter(e.target.value))}
        aria-label="Filter policies by status"
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="expired">Expired</option>
        <option value="pending">Pending</option>
      </select>
    </label>
  )
}

export default PolicyFilter
