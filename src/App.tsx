export default function App() {
  const items = ["item-1", "item-2", "item-3", "item-4"]

  return (
    <div>
      <h1 className="text-3xl">My Item List</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
