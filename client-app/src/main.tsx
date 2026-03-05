import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./app/App.tsx"
import "./index.css"
import { Provider } from "react-redux"
import { store } from "./app/stores/store.ts"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

const container = document.getElementById("root")

if (!container) {
  throw new Error(
    "Root element with ID 'root' was not found in the DOM. Ensure that an element with the ID 'root' exists",
  )
}

createRoot(container).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
