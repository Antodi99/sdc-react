import { AnimatePresence, motion } from "framer-motion"
import { Routes, Route, Location } from "react-router-dom"
import { Component, ReactNode } from "react"
import { Home, Menu, Company, Login } from "@/pages"
import { Header, Footer } from "@/components"

type AppProps = {
  location: Location
}

type AppState = {
  cartCount: number
}

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    this.state = { cartCount: 0 }
  }

  handleAddToCart = (quantity: number) => {
    this.setState((prev) => ({
      cartCount: prev.cartCount + quantity,
    }))
  }

  render() {
    const { location } = this.props
    const { cartCount } = this.state

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
            <Route path="/menu" element={<PageWrapper><Menu onAddToCart={this.handleAddToCart} /></PageWrapper>} />
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
      </div>
    )
  }
}

class PageWrapper extends Component<{ children: ReactNode }> {
  render() {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {this.props.children}
      </motion.div>
    )
  }
}
