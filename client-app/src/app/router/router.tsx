import { createBrowserRouter } from "react-router"
import HomePage from "../../pages/home/home"
import PolicyPage from "../../pages/Policy/PolicyPage"
import AppLayout from "../layouts/AppLayout"

export const routes = {
  index: "/",
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "policies",
        element: <PolicyPage />,
      },
    ],
  },
])
