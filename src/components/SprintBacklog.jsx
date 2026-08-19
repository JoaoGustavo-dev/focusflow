import { useGetTasks } from '../hooks/data/use-get-tasks'
import Button from './Button'
import PlusIcon from '../assets/icons/plus.svg?react'
import TaskRow from './TaskRow'
import { statusLabels } from '../utils/statusLabels'
import { statusVariants } from '../utils/statusVariants'
import { priorityLabels } from '../utils/priorityLabels'

const SprintBacklog = ({ sprintId }) => {
  const { data: tasks } = useGetTasks(sprintId)

  return (
    <div className="flex flex-col">
      <div className="bg-high-surface flex justify-between p-4">
        <p className="text-main font-display text-2xl">Sprint Backlog</p>
        <Button>
          <PlusIcon /> New Task
        </Button>
      </div>

      {tasks?.map((task) => {
        return (
          <TaskRow
            key={task?.id}
            task={task}
            title={task?.title}
            description={task?.description}
            status={statusVariants[task?.status]}
            checkBoxStatus={task?.status}
            sprintId={Number(task?.sprintId)}
            taskId={task?.id}
            priority={task?.priority}
            priorityBadgeTitle={priorityLabels[task?.priority]}
            statusBadgeTitle={statusLabels[task?.status]}
            time={task?.time}
          />
        )
      })}
    </div>
  )
}

export default SprintBacklog
