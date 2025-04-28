import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, Tooltip } from "@/components"
import Spinner from "@/assets/icons/spinner.svg?react"
import menuData from "./menuData.json"

type Meal = {
  id: string
  meal: string
  price: number
  instructions: string
  img: string
}

type MenuProps = {
  onAddToCart: (quantity: number) => void
}

const PAGE_LIMIT = 6

export default function Menu({ onAddToCart }: MenuProps) {
  const [meals, setMeals] = useState<Meal[]>([])
  const [activeItem, setActiveItem] = useState(0)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  async function fetchMeals() {
    if (isLoading || !hasMore) return

    setIsLoading(true)

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/meals?page=${page}&limit=${PAGE_LIMIT + 1}`)
      const data = await res.json()

      const hasMore = data.length > PAGE_LIMIT
      const newItems = hasMore ? data.slice(0, PAGE_LIMIT) : data

      setMeals((prev) => [...prev, ...newItems])
      setHasMore(hasMore)
    } catch (error) {
      console.error("Error fetching meals:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMeals()
  }, [page])

  const { menuItems } = menuData

  return (
    <main className="bg-lightGreen flex justify-center pt-40 pb-28 clip-custom">
      <div className="wrapper-common flex-col justify-between items-center gap-8">
        <h1 className="text-[56px] leading-[60px] text-green">Browse our menu</h1>
        <p className="max-w-[450px] w-full text-center text-darkGray text-lg">
          Use our menu to place an order online, or&nbsp;
          <Tooltip text="+37068031150">
            <span className="text-green cursor-pointer">phone</span>
          </Tooltip>
          &nbsp;our store to place a pickup order. Fast and fresh food.
        </p>
        <ul className="flex gap-8 mt-4">
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`px-12 py-4 border-1 rounded-md cursor-pointer transition-all duration-300 ease-in-out
                ${activeItem === item.id
                  ? "bg-green border-green text-white"
                  : "border-gray-200 hover:bg-green hover:text-white hover:border-green"
                }`}
            >
              {item.name}
            </li>
          ))}
        </ul>

        {isLoading && meals.length === 0 ? (
          <div className="flex justify-center items-center min-h-[200px] w-full">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 mt-4">
            {meals.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex"
              >
                <div className="flex-1 flex flex-col">
                  <Card
                    title={item.meal}
                    price={item.price}
                    description={item.instructions}
                    image={item.img}
                    onAddToCart={onAddToCart}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {hasMore && meals.length > 0 && (
          <button
            onClick={() => setPage(page + 1)}
            disabled={isLoading}
            className="py-3 px-8 h-full bg-green rounded-md text-white hover:cursor-pointer mt-8 disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "See more"}
          </button>
        )}
      </div>
    </main>
  )
}
