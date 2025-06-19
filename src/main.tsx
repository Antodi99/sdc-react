import { Provider } from "react-redux"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { StrictMode } from "react"
import App from "@/App"
import "@/styles/index.css"
import { store } from '@/store'
import { ThemeProvider } from "@/context/ThemeProvider"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider >
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
