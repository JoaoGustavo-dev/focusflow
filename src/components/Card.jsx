const Card = ({ children }) => {
  return (
    <div className="bg-high-surface border-border flex flex-col gap-4 rounded-sm border px-5 py-5">
      {children}
    </div>
  )
}

export default Card
