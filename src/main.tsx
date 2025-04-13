import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { StrictMode } from "react"
import AppWrapper from "@/wrappers/AppWrapper"
import "@/styles/index.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </StrictMode>,
)
