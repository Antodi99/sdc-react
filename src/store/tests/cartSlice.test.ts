import cartReducer, { addToCart, removeFromCart, clearCart, loadCart, CartItem } from "@/store/cartSlice"

describe("cartSlice reducer", () => {
  const initialState = { items: [], totalAmount: 0 }

  const mockItem: CartItem = {
    id: "1",
    title: "Item 1",
    image: "image.png",
    description: "desc",
    price: 10,
    quantity: 1,
  }

  it("should return initial state", () => {
    expect(cartReducer(undefined, { type: "" })).toEqual(initialState)
  })

  it("should add item to cart", () => {
    const result = cartReducer(initialState, addToCart(mockItem))
    expect(result.items).toHaveLength(1)
    expect(result.totalAmount).toBe(1)
  })

  it("should increase quantity if item already exists", () => {
    const state = {
      items: [{ ...mockItem }],
      totalAmount: 1,
    }
    const result = cartReducer(state, addToCart({ ...mockItem, quantity: 2 }))
    expect(result.items[0].quantity).toBe(3)
    expect(result.totalAmount).toBe(3)
  })

  it("should remove item from cart", () => {
    const state = {
      items: [{ ...mockItem }],
      totalAmount: 1,
    }
    const result = cartReducer(state, removeFromCart("1"))
    expect(result.items).toHaveLength(0)
    expect(result.totalAmount).toBe(0)
  })

  it("should clear cart", () => {
    const state = {
      items: [mockItem],
      totalAmount: 1,
    }
    const result = cartReducer(state, clearCart())
    expect(result).toEqual(initialState)
  })

  it("should load cart state", () => {
    const newState = {
      items: [mockItem],
      totalAmount: 1,
    }
    const result = cartReducer(initialState, loadCart(newState))
    expect(result).toEqual(newState)
  })
})
