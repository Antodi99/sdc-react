import { ReactNode, useEffect, useState } from "react"
import { ThemeContext } from "./ThemeContext"

type Theme = "light" | "dark"

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const getSystemTheme = (): Theme => window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"

  const [theme, setTheme] = useState<Theme>(getSystemTheme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
       root.style.backgroundColor = "#191b22"
    } else {
      root.classList.remove("dark")
       root.style.backgroundColor = ""
    }
  }, [theme])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => setTheme(getSystemTheme())
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
