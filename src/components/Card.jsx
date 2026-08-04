const Card = ({ children }) => {
  return (
    <div className="bg-high-surface flex flex-col gap-4 rounded-sm px-5 py-5">
      {children}
    </div>
  )
}

export default Card
