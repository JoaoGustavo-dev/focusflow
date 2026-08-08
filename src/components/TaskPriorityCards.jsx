import { useGetSprints } from '../hooks/data/use-get-sprints'
import { useGetTasks } from '../hooks/data/use-get-tasks'
import { parseDate } from '../utils/parseDate'
import TaskPriorityCard from './TaskPriorityCard'
import { statusVariants } from '../utils/statusVariants'
import { statusLabels } from '../utils/statusLabels'

const TaskPriorityCards = () => {
  const { data: tasks } = useGetTasks()
  const { data: sprints } = useGetSprints()

  const highPriorityTasks = tasks?.filter(
    (task) => task.status !== 'done' && task.priority === 'high'
  )

  const actualDate = new Date()

  const tasksWithSprintInfo = highPriorityTasks?.map((task) => {
    const sprintsTask = sprints?.find(
      (sprint) => Number(sprint?.id) === task?.sprintId
    )

    if (sprintsTask === undefined) {
      return null
    }

    const sprintEnd = sprintsTask?.endDate

    const sprintEndParsed = parseDate(sprintEnd)

    const endDaysLeft = sprintEndParsed - actualDate

    const sprintName = sprintsTask?.title

    return {
      ...task,
      endDays: endDaysLeft,
      sprintName: sprintName,
    }
  })

  const filteredTasksWithSprintInfo = tasksWithSprintInfo?.filter(
    (task) => task !== null
  )

  const sortedHighPriorityTasks = filteredTasksWithSprintInfo?.sort(
    (taskA, taskB) => {
      if (taskA.status === 'in-progress') {
        return -1
      }
      if (taskB.status === 'in-progress') {
        return 1
      }

      return taskA.endDays - taskB.endDays
    }
  )

  const selectedTasks = sortedHighPriorityTasks?.slice(0, 3)

  return (
    <div className="flex flex-col gap-2">
      <p className="font-display text-main text-2xl">High Priority Tasks</p>
      {selectedTasks?.length === 0 ? (
        <p className="text-main mt-4 text-center text-2xl">
          No high priority tasks at the moment!
        </p>
      ) : (
        selectedTasks?.map((task) => {
          return (
            <TaskPriorityCard
              key={task.id}
              title={task.title}
              sprintName={task.sprintName}
              badgeTitle={statusLabels[task.status]}
              status={statusVariants[task.status]}
            />
          )
        })
      )}
    </div>
  )
}

export default TaskPriorityCards
