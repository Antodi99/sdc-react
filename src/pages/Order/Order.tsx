import { RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import { removeFromCart } from "@/store/cartSlice"
import { toast } from "react-toastify"

export default function Order() {
  const dispatch = useDispatch()
  const { items } = useSelector((state: RootState) => state.cart)

  function handleDelete(id: string) {
    dispatch(removeFromCart(id))
    toast.success("Item deleted successfully!")
  }

  return (
    <main className="bg-lightGreen min-h-screen flex justify-center pt-40 pb-28 clip-custom">
      <div className="wrapper-common flex-col items-center gap-8">
        <h1 className="text-green text-5xl text-center">Finish your order</h1>
        {items.length === 0 && (
          <p className="text-center text-xl text-gray-500 mt-10">Your cart is empty</p>
        )}
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-lg bg-white w-full px-6 py-10 border border-[#35B8BE26] rounded-lg">
            <section className="flex gap-6">
              <img src={item.image} className="size-32" />
              <h2 className="mt-8">{item.title}</h2>
            </section>
            <section className="h-full flex items-center gap-6">
              <h3 className="text-green mr-10">$ {(item.price * item.quantity).toFixed(2)} USD</h3>
              <div className="bg-[#FAFAFA] border border-[#DDDDDD] px-6 py-2 rounded-lg">{item.quantity}</div>
              <button
                className="bg-green p-2 text-white rounded-md hover:opacity-90 hover:cursor-pointer"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </section>
          </div>
        ))}
      </div>
    </main>
  )
}
