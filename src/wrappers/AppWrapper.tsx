import { useLocation } from "react-router-dom"
import App from "@/App"

function AppWrapper() {
  const location = useLocation()
  
  // Return the class-based App with location passed as a prop
  return <App location={location} />
}

export default AppWrapper
