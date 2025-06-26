import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import cartReducer, { removeFromCart } from "@/store/cartSlice"
import Order from "./Order"

describe("Order Page", () => {
  it("should remove item when Delete is clicked", () => {
    const store = configureStore({
      reducer: { cart: cartReducer },
      preloadedState: {
        cart: {
          items: [
            {
              id: "1",
              title: "Sushi",
              image: "sushi.jpg",
              description: "Tasty",
              price: 15,
              quantity: 2,
            },
          ],
          totalAmount: 2,
        },
      },
    })

    const dispatchSpy = jest.spyOn(store, "dispatch")

    render(
      <Provider store={store}>
        <Order />
      </Provider>
    )

    fireEvent.click(screen.getByText(/Delete/i))

    expect(dispatchSpy).toHaveBeenCalledWith(removeFromCart("1"))
  })
})
