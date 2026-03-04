import { Link, Outlet } from "react-router"

export default function AppLayout() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/policies">Policies</Link>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  )
}
