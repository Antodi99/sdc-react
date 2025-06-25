import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import cartReducer, { addToCart } from "@/store/cartSlice"
import Card from "./Card"

describe("Card Component", () => {
  it("should dispatch addToCart when button is clicked", () => {
    const store = configureStore({
      reducer: { cart: cartReducer },
      preloadedState: { cart: { items: [], totalAmount: 0 } },
    })

    const dispatchSpy = jest.spyOn(store, "dispatch")

    render(
      <Provider store={store}>
        <Card
          title="Pizza"
          image="pizza.jpg"
          description="Delicious"
          price={9.99}
        />
      </Provider>
    )

    fireEvent.click(screen.getByText(/Add to cart/i))

    expect(dispatchSpy).toHaveBeenCalledWith(
      addToCart({
        id: "Pizza",
        title: "Pizza",
        image: "pizza.jpg",
        description: "Delicious",
        price: 9.99,
        quantity: 1,
      })
    )
  })
})
