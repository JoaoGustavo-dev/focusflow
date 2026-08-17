import { checkboxVariants } from '../utils/checkboxVariants'
import LoaderIcon from '../assets/icons/loader.svg?react'
import DoneIcon from '../assets/icons/done.svg?react'

const TaskCheckbox = ({ id, status, onToggle }) => {
  return (
    <label
      htmlFor={id}
      className={`border-border text-main relative flex h-5 w-5 items-center rounded-xs border ${checkboxVariants[status]}`}
    >
      <input
        type="checkbox"
        name="checkbox"
        id={id}
        className="absolute inset-0 cursor-pointer opacity-0"
        onChange={onToggle}
      />
      {status === 'in-progress' && <LoaderIcon className="animate-spin" />}
      {status === 'done' && <DoneIcon />}
    </label>
  )
}

export default TaskCheckbox
