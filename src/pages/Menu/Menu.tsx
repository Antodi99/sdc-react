import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { Card, Tooltip } from "@/components"
import {
  fetchMeals,
  resetMeals,
  incrementPage,
} from "@/store/mealsSlice"
import { RootState, AppDispatch } from "@/store"
import Spinner from "@/assets/icons/spinner.svg?react"
import { MENU_ITEMS } from "./Menu.constants"

export default function Menu() {
  const dispatch = useDispatch<AppDispatch>()
  const { meals, loading, hasMore, category, page } = useSelector(
    (state: RootState) => state.meals
  )

  useEffect(() => {
    dispatch(fetchMeals({ category, page }))
  }, [dispatch, category, page])

  function handleCategoryClick(cat: string) {
    if (cat === category) return
    dispatch(resetMeals(cat))
  }

  function handleLoadMore() {
    dispatch(incrementPage())
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
                ${category === item.name.toLowerCase()
                  ? "bg-green border-green text-white"
                  : "border-gray-200 hover:bg-green hover:text-white hover:border-green"}`}
            >
              {item.name}
            </li>
          ))}
        </ul>

        {loading && meals.length === 0 ? (
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
              >
                <Card
                  title={item.meal}
                  price={item.price}
                  description={item.instructions}
                  image={item.img}
                />
              </motion.div>
            ))}
          </div>
        )}

        {hasMore && meals.length > 0 && (
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="py-3 px-8 h-full bg-green rounded-md text-white hover:cursor-pointer mt-8 disabled:opacity-50"
          >
            {loading ? "Loading..." : "See more"}
          </button>
        )}
      </div>
    </main>
  )
}
