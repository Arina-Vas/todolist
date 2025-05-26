import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./app/App.tsx"
import { Provider } from "react-redux"
import { HashRouter } from "react-router"
import { store } from "@/app/store.ts"

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
)
