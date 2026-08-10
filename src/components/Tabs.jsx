const tabOptions = ['All', 'Pending', 'In-progress', 'Done']

const Tabs = ({ activeOption, filterFunction }) => {
  return (
    <div className="bg-high-surface border-border flex self-start border p-1">
      {tabOptions.map((option) => {
        const isActive = () => {
          if (activeOption === option) {
            return 'text-main bg-disabled'
          }

          return 'text-secondary'
        }

        return (
          <button
            key={option}
            onClick={() => filterFunction(option)}
            className={`rounded-sm px-4 py-1.5 hover:cursor-pointer ${isActive()}`}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

export default Tabs
