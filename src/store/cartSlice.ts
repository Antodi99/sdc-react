import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type CartItem = {
  id: string
  title: string
  image: string
  description: string
  price: number
  quantity: number
}

export interface CartState {
  items: CartItem[]
  totalAmount: number
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const { id, title, image, description, price, quantity } = action.payload
      const existingItem = state.items.find(item => item.id === id)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({ id, title, image, description, price, quantity })
      }

      state.totalAmount += quantity
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const id = action.payload
      const item = state.items.find(i => i.id === id)
      if (!item) return

      state.items = state.items.filter(i => i.id !== id)
      state.totalAmount -= item.quantity
    },
    clearCart(state) {
      state.items = []
      state.totalAmount = 0
    },
    loadCart(state, action: PayloadAction<CartState>) {
      state.items = action.payload.items
      state.totalAmount = action.payload.totalAmount
    },
  },
})

export const { addToCart, removeFromCart, clearCart, loadCart } = cartSlice.actions
export default cartSlice.reducer
