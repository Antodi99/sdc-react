import { useState } from "react"

type CardProps = {
  title: string
  image: string
  description: string
  price: number
  onAddToCart: (quantity: number) => void
}

export default function Card({ title, image, description, price, onAddToCart }: CardProps) {
  const [value, setValue] = useState(1)

  return (
    <div className="flex rounded-md h-full gap-6 bg-white p-6 border-1 border-[#35B8BE26]">
      <img src={image} alt={title} className="size-36" />
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-start">
          <h1 className="text-lg font-semibold">{title}</h1>
          <p className="text-green font-medium">${price.toFixed(2)} USD</p>
        </div>
        <p className="mt-6 text-[#546285] text-sm min-h-16 line-clamp-3">{description}</p>
        <div className="flex gap-2 max-h-10 mt-4">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value && +e.target.value >= 1 ? +e.target.value : 1)}
            onKeyDown={(e) => ['+', '-', '.'].includes(e.key) && e.preventDefault()}
            className="w-16 bg-white rounded-md border-1 border-gray h-full outline-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            className="py-2 px-6 h-full bg-green rounded-md text-white hover:cursor-pointer"
            onClick={() => onAddToCart(value)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}
