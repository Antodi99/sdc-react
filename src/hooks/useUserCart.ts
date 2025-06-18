import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { loadCart, clearCart, CartState } from "@/store/cartSlice"
import { AppDispatch } from "@/store"

export function useUserCart(user: string | null, cart: CartState) {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user}`)
      if (savedCart) {
        dispatch(loadCart(JSON.parse(savedCart)))
      } else {
        dispatch(clearCart())
      }
    } else {
      dispatch(clearCart())
    }
  }, [user, dispatch])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user}`, JSON.stringify(cart))
    }
  }, [cart, user])
}
