import { checkboxVariants } from '../utils/checkboxVariants'
import LoaderIcon from '../assets/icons/loader.svg?react'
import CheckIcon from '../assets/icons/check.svg?react'

const TaskCheckbox = ({ id, status, onToggle }) => {
  return (
    <label
      htmlFor={id}
      className={`border-border text-main relative flex h-6 w-6 items-center rounded-xs border ${checkboxVariants[status]}`}
    >
      <input
        type="checkbox"
        name="checkbox"
        id={id}
        className="absolute inset-0 cursor-pointer opacity-0"
        onChange={onToggle}
      />
      {status === 'in-progress' && (
        <LoaderIcon className="h-full w-full animate-spin" />
      )}
      {status === 'done' && <CheckIcon className="h-full w-full" />}
    </label>
  )
}

export default TaskCheckbox
