import PriorityBadge from './PriorityBadge'
import StatusBadge from './StatusBadge'
import TaskCheckbox from './TaskCheckbox'
import TaskTime from './TaskTime'
import { useUpdateTask } from '../hooks/data/use-update-task'
import { nextTaskStatus } from '../utils/nextTaskStatus'
import { toast } from 'sonner'

const TaskRow = ({
  title,
  description,
  status,
  sprintId,
  taskId,
  priority,
  priorityBadgeTitle,
  statusBadgeTitle,
  time,
}) => {
  const { mutate } = useUpdateTask(sprintId, taskId)

  const taskNewStatus = (status) => {
    return nextTaskStatus[status]
  }

  const handleCheckBoxClick = (taskStatus) => {
    mutate(
      {
        status: taskNewStatus(taskStatus),
      },
      {
        onSuccess: () => toast.success('Task status sucessfully updated'),
        onError: () => toast.error('Error on updating task'),
      }
    )
  }

  return (
    <div className="border-border flex gap-4 border-b p-4">
      <TaskCheckbox
        id={taskId}
        status={status}
        onToggle={() => handleCheckBoxClick(status)}
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
