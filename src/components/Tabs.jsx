import { statusTranslations } from '../utils/statusTranslations'

const Tabs = ({ activeOption, filterFunction }) => {
  const translations = Object.entries(statusTranslations)

  return (
    <div className="bg-high-surface border-border flex self-start border p-1">
      {translations.map(([value, label]) => {
        const isActive = () => {
          if (activeOption === value) {
            return 'text-main bg-disabled'
          }

          return 'text-secondary'
        }

        return (
          <button
            key={value}
            onClick={() => filterFunction(value)}
            className={`rounded-sm px-4 py-1.5 hover:cursor-pointer ${isActive()}`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

export default Tabs
