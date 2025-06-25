import "react-toastify/dist/ReactToastify.css"
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer } from "react-toastify"
import { ReactNode, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/plugins/firebase"
import { setUser, clearUser } from "@/store/authSlice"
import { RootState } from "@/store"
import { Home, Menu, Company, Login, Order } from "@/pages"
import { Header, Footer } from "@/components"
import { useUserCart } from "@/hooks/useUserCart"

export default function App() {
  const [authChecked, setAuthChecked] = useState(false)
  const location = useLocation()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)
  const cart = useSelector((state: RootState) => state.cart)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser?.email) {
        dispatch(setUser(firebaseUser.email))
      } else {
        dispatch(clearUser())
      }
      setAuthChecked(true)
    })
    return unsubscribe
  }, [dispatch])

  useUserCart(user, cart)

  if (!authChecked) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center h-screen"
      >
        <p>Loading...</p>
      </motion.div>
    )
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
      </motion.div>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/menu" element={
            <PrivateRoute>
              <PageWrapper><Menu /></PageWrapper>
            </PrivateRoute>
          } />
          <Route path="/company" element={<PageWrapper><Company /></PageWrapper>} />
          <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route
            path="/order"
            element={
              <PrivateRoute>
                <PageWrapper><Order /></PageWrapper>
              </PrivateRoute>
            }
          />
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

function PrivateRoute({ children }: { children: ReactNode }) {
  const user = useSelector((state: RootState) => state.auth.user)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
