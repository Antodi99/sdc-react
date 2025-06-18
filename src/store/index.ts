import { configureStore } from "@reduxjs/toolkit"
import mealsReducer from "./mealsSlice"
import authReducer from "./authSlice"
import cartReducer from "./cartSlice"

export const store = configureStore({
  reducer: {
    meals: mealsReducer,
    auth: authReducer,
    cart: cartReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
