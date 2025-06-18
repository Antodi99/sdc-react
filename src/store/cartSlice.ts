import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface CartState {
  count: number
}

const initialState: CartState = {
  count: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<number>) {
      state.count += action.payload
    },
  },
})

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer
