import { ReactNode } from "react"

type TooltipProps = {
  children: ReactNode,
  text: string,
  position?: "top" | "bottom" | "left" | "right",
}

export default function Tooltip({ children, text, position = "top" }: TooltipProps) {
  const baseStyle = `absolute 
    opacity-0 scale-95 
    group-hover:opacity-100 group-hover:scale-100 
    transition-all duration-300 
    bg-green text-white text-sm px-2 py-1 rounded shadow 
    whitespace-nowrap z-10 pointer-events-none
  `

  const positionClasses = {
    top: "bottom-3/4 left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-3/4 left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  }

  return (
    <span className="relative group inline-block">
      <span className={`${baseStyle} ${positionClasses[position]}`}>
        {text}
      </span>
      <span className="cursor-pointer">
        {children}
      </span>
    </span>
  )
}
