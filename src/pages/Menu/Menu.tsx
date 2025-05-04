import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useFetch } from "@/hooks/useFetch"
import { Card, Tooltip } from "@/components"
import Spinner from "@/assets/icons/spinner.svg?react"
import { MENU_ITEMS, PAGE_LIMIT, DEFAULT_CATEGORY } from "./Menu.constants"

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

export default function Menu({ onAddToCart }: MenuProps) {
  const [page, setPage] = useState(1)
  const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORY)
  const [allMeals, setAllMeals] = useState<Meal[]>([])

  const { data: meals, isLoading } = useFetch<Meal[]>(
    `meals-${activeCategory}-page-${page}`,
    async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/meals?category=${activeCategory}&page=${page}&limit=${PAGE_LIMIT}`
      )
      const data = await res.json()
      return data
    },
    {
      immediate: true,
      log: true,
      deps: [activeCategory, page],
    }
  )

  useEffect(() => {
    setAllMeals([])
  }, [activeCategory])

  useEffect(() => {
    if (meals && meals.length > 0) {
      setAllMeals((prev) => {
        const existingIds = new Set(prev.map((item) => item.id))
        const newMeals = meals.filter((item) => !existingIds.has(item.id))
        const updated = [...prev, ...newMeals]
        return updated
      })
    }
  }, [meals])

  const hasMore = meals ? meals.length >= PAGE_LIMIT : false

  function handleCategoryClick(categoryName: string) {
    if (categoryName === activeCategory) return
    setActiveCategory(categoryName)
    setPage(1)
    setAllMeals([])
  }

  function handleLoadMore() {
    setPage((prev) => prev + 1)
  }

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
          {MENU_ITEMS.map((item) => (
            <li
              key={item.id}
              onClick={() => handleCategoryClick(item.name.toLowerCase())}
              className={`px-12 py-4 border-1 rounded-md cursor-pointer transition-all duration-300 ease-in-out
                ${activeCategory === item.name.toLowerCase()
                  ? "bg-green border-green text-white"
                  : "border-gray-200 hover:bg-green hover:text-white hover:border-green"
                }`}
            >
              {item.name}
            </li>
          ))}
        </ul>

        {isLoading && allMeals.length === 0 ? (
          <div className="flex justify-center items-center min-h-[200px] w-full">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 mt-4">
            {allMeals.map((item) => (
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

        {hasMore && allMeals.length > 0 && (
          <button
            onClick={handleLoadMore}
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
