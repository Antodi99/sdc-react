import { useState } from "react"
import { Card, Tooltip } from "@/components"
import menuData from "./menuData.json"

export default function Menu() {
  const [activeItem, setActiveItem] = useState(0)

  const { menuItems, cardItems } = menuData

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
        <div className="grid grid-cols-2 gap-6 mt-4">
          {cardItems.map((item, index) => (
            <Card key={index} {...item} />
          ))}
        </div>
        <button className="py-3 px-8 h-full bg-green rounded-md text-white hover:cursor-pointer mt-8">See more</button>
      </div>
    </main>
  )
}
