import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import { useState, ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Routes, Route, useLocation } from "react-router-dom"
import { Home, Menu, Company, Login } from "@/pages"
import { Header, Footer } from "@/components"

export default function App() {
  const location = useLocation()
  const [cartCount, setCartCount] = useState(0)

  function handleAddToCart(quantity: number) {
    setCartCount(prevCount => prevCount + quantity)
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header cartCount={cartCount} />
      </motion.div>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/menu" element={<PageWrapper><Menu onAddToCart={handleAddToCart} /></PageWrapper>} />
          <Route path="/company" element={<PageWrapper><Company /></PageWrapper>} />
          <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        </Routes>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Footer />
      </motion.div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        draggable
        pauseOnHover
      />
    </div>
  )
}

function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
