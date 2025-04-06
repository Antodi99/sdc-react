import { NavLink } from "react-router-dom"
import Logo from '@/assets/icons/logo.svg?react'
import Cart from '@/assets/icons/cart.svg?react'

export default function Header() {
  const routes = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Company", path: "/company" },
    { name: "Login", path: "/login" }
  ]

  return (
    <header className="w-full h-24 flex justify-center">
      <div className="wrapper-common justify-between items-center">
        <NavLink to={"/"}>
          <Logo className="w-10 text-blue-500" />
        </NavLink>
        <nav className="flex gap-24 items-center">
          <ul className="flex gap-12 text-darkBlue">
            {routes.map((link) => (
              <li key={link.path}>
                <NavLink to={link.path} className={({ isActive }) => `transition-all duration-300 ease-in-out ${isActive ? "text-green" : "hover:text-green"}`}>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="w-14 h-14 bg-green rounded-md flex items-center justify-center relative">
            <div className="w-7 h-7 absolute top-[-10px] right-[-10px] flex items-center justify-center bg-white shadow-xl text-green text-sm rounded-full">
              <p>0</p>
            </div>
            <Cart className="w-6" />
          </div>
        </nav>
      </div>
    </header>
  )
}
