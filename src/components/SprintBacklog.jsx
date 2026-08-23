import { useGetTasks } from '../hooks/data/use-get-tasks'
import Button from './Button'
import PlusIcon from '../assets/icons/plus.svg?react'
import TaskRow from './TaskRow'
import EmptyState from './EmptyState'
import { statusLabels } from '../utils/statusLabels'
import { statusVariants } from '../utils/statusVariants'
import { priorityLabels } from '../utils/priorityLabels'
import { Fragment } from 'react'
import NoTasks from '../assets/icons/no-tasks.svg?react'

const SprintBacklog = ({ sprintId, createTask }) => {
  const { data: tasks } = useGetTasks(sprintId)

  return (
    <Fragment>
      {tasks?.length === 0 ? (
        <EmptyState
          icon={<NoTasks />}
          title="No tasks created yet"
          subtitle="Start planning your sprint by adding tasks. Set
          priorities, estimate points, and distribute the work to the
          team."
          onClick={createTask}
          buttonText={
            <Fragment>
              {' '}
              <PlusIcon /> Crate your first task{' '}
            </Fragment>
          }
        />
      ) : (
        <div className="flex flex-col">
          <div className="bg-high-surface flex justify-between p-4">
            <p className="text-main font-display text-2xl">Sprint Backlog</p>
            <Button onClick={createTask}>
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
                sprintId={task?.sprintId}
                taskId={task?.id}
                priority={task?.priority}
                priorityBadgeTitle={priorityLabels[task?.priority]}
                statusBadgeTitle={statusLabels[task?.status]}
                time={task?.time}
              />
            )
          })}
        </div>
      )}
    </Fragment>
  )
}

export default SprintBacklog
