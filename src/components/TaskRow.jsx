import PriorityBadge from './PriorityBadge'
import StatusBadge from './StatusBadge'
import TaskCheckbox from './TaskCheckbox'
import TaskTime from './TaskTime'

const TaskRow = ({
  title,
  description,
  status,
  checkboxId,
  checkboxOnToggle,
  priority,
  priorityBadgeTitle,
  statusBadgeTitle,
  time,
}) => {
  return (
    <div className="border-border flex gap-4 border-b p-4">
      <TaskCheckbox
        id={checkboxId}
        status={status}
        onToggle={checkboxOnToggle}
      />
      <div className="flex flex-col">
        <div className="flex flex-col">
          <p className="text-main text-base">{title}</p>
          <p className="text-secondary text-[12px]">{description}</p>
        </div>

        <div className="flex gap-2 pt-1">
          <PriorityBadge priority={priority} title={priorityBadgeTitle} />
          <StatusBadge status={status} title={statusBadgeTitle} />
          <TaskTime time={time} />
        </div>
      </div>
    </div>
  )
}

export default TaskRow
