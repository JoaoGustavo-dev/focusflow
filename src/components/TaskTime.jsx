import { timeIcons } from '../utils/timeIcons'

const TaskTime = ({ time }) => {
  const TimeIcon = timeIcons[time]

  return (
    <div className="text-secondary flex gap-1 text-[11px]">
      <TimeIcon /> {time}
    </div>
  )
}

export default TaskTime
