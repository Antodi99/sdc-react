import { useSelector, useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import { useContext } from "react"
import Logo from "@/assets/icons/logo.svg?react"
import Cart from "@/assets/icons/cart.svg?react"
import Moon from "@/assets/icons/moon.svg?react"
import Sun from "@/assets/icons/sun.svg?react"
import { AppDispatch, RootState } from "@/store"
import { logoutUser } from "@/store/authSlice"
import { ThemeContext } from "@/context/ThemeContext"

const CART_SHOW_LIMIT = 10

export default function Header() {
  const cartCount = useSelector((state: RootState) => state.cart.totalAmount)
  const isLoggedIn = useSelector((state: RootState) => state.auth.user !== null)
  const displayCartCount = cartCount >= CART_SHOW_LIMIT ? `${CART_SHOW_LIMIT - 1}+` : cartCount
  const dispatch = useDispatch<AppDispatch>()
  const { theme, toggleTheme } = useContext(ThemeContext)

  async function handleLogout() {
    await dispatch(logoutUser())
  }

  const routes = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Company", path: "/company" },
    ...(!isLoggedIn
      ? [{ name: "Login", path: "/login" }]
      : [])
  ]

  return (
    <header className="w-full h-24 flex justify-center bg-white dark:bg-black shadow-md dark:border dark:border-b-white">
      <div className="wrapper-common justify-between items-center flex">
        <NavLink to="/">
          <Logo className="w-10 text-blue-500" />
        </NavLink>

        <nav className="flex gap-12 items-center">
          <ul className="flex gap-8 text-darkBlue dark:text-gray-100 items-center">
            {routes.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `transition-all duration-300 ease-in-out ${isActive ? "text-green" : "hover:text-green"}`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}

            {isLoggedIn && (
              <li>
                <button
                  onClick={handleLogout}
                  className="transition-all duration-300 ease-in-out text-darkBlue dark:text-gray-100 hover:text-green"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>

          <NavLink to="/order">
            <div className="w-14 h-14 bg-green rounded-md flex items-center justify-center relative">
              <div className="w-7 h-7 absolute top-[-10px] right-[-10px] flex items-center justify-center bg-white text-green text-sm rounded-full shadow-xl">
                <p>{displayCartCount}</p>
              </div>
              <Cart className="w-6" />
            </div>
          </NavLink>

          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded border border-gray-300 hover:bg-gray-100 cursor-pointer hover:text-black dark:text-white transition-all duration-300"
          >
            {theme === "light" ? <Moon className="size-5" /> : <Sun className="size-5" />}
          </button>
        </nav>
      </div>
    </header>
  )
}
