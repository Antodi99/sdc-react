import { useState } from "react"
import { useDispatch } from "react-redux"
import { addToCart } from "@/store/cartSlice"

type CardProps = {
  title: string
  image: string
  description: string
  price: number
}

export default function Card({ title, image, description, price }: CardProps) {
  const [value, setValue] = useState(1)
  const dispatch = useDispatch()

  function handleAddToCart() {
    dispatch(
      addToCart({
        id: title,
        title,
        image,
        description,
        price,
        quantity: value,
      })
    )
  }

  return (
    <div className="flex rounded-md h-full gap-6 bg-white dark:bg-black p-6 border-1 border-[#35B8BE26] dark:border-white">
      <img src={image} alt={title} className="size-36" />
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-start">
          <h1 className="text-lg font-semibold dark:text-white">{title}</h1>
          <p className="text-green font-medium">${price.toFixed(2)} USD</p>
        </div>
        <p className="mt-6 text-[#546285] dark:text-gray-400 text-sm min-h-16 line-clamp-3">{description}</p>
        <div className="flex gap-2 max-h-10 mt-4">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value && +e.target.value >= 1 ? +e.target.value : 1)}
            onKeyDown={(e) => ['+', '-', '.'].includes(e.key) && e.preventDefault()}
            className="w-16 bg-white dark:bg-black dark:text-white rounded-md border-1 border-gray h-full outline-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            className="py-2 px-6 h-full bg-green rounded-md text-white hover:cursor-pointer"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}
