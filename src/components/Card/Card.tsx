import { useState, useEffect } from "react"

type CardProps = {
  name: string
  slug: string
  description: string
  price: number
}

export default function Card({ name, slug, description, price }: CardProps) {
  const [value, setValue] = useState(1)
  const [imageSrc, setImageSrc] = useState<string | null>(null)

  useEffect(() => {
    const loadImage = async () => {
      try {
        const image = await import(`@/assets/images/${slug}.png`)
        setImageSrc(image.default)
      } catch (error) {
        console.error("Image not found:", error)
        setImageSrc(null)
      }
    }

    loadImage()
  }, [slug])

  return (
    <div className="flex rounded-md gap-6 bg-white p-6 border-1 border-[#35B8BE26]">
      <img src={imageSrc || '/fallback-image.png'} alt={name} />
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-start">
          <h1 className="text-lg font-semibold">{name}</h1>
          <p className="text-green font-medium">${price.toFixed(2)} USD</p>
        </div>
        <p className="mt-6 text-[#546285] text-sm">{description}</p>
        <div className="flex gap-2 max-h-10 mt-4">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value && +e.target.value >= 1 ? +e.target.value : 1)}
            onKeyDown={(e) => ['+', '-', '.'].includes(e.key) && e.preventDefault()}
            className="w-16 bg-white rounded-md border-1 border-gray h-full outline-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button className="py-2 px-6 h-full bg-green rounded-md text-white hover:cursor-pointer">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}
