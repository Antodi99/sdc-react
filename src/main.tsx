import { Provider } from "react-redux"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { StrictMode } from "react"
import App from "@/App"
import "@/styles/index.css"
import { store } from '@/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
