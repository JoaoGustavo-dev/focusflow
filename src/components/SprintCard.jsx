const SprintCard = ({ title, icon, number, progress, bg }) => {
  return (
    <div className="bg-high-surface flex flex-col gap-4 rounded-sm px-5 py-5">
      <div className="text-secondary flex justify-between">
        <p className="text-base">{title}</p>
        <p>{icon}</p>
      </div>
      <div>
        <p className="text-main text-3xl">{number}</p>
      </div>

      <div className="bg-border h-1 w-full rounded-full">
        <div
          className={`h-full rounded-full ${bg}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

export default SprintCard
