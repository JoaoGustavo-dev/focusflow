import { useGetSprints } from '../hooks/data/use-get-sprints'
import { useGetTasks } from '../hooks/data/use-get-tasks'
import { parseDate } from '../utils/parseDate'
import { statusLabels } from '../utils/statusLabels'
import { statusVariants } from '../utils/statusVariants'
import ActiveSprintCard from './ActiveSprintCard'
import { NavLink } from 'react-router-dom'
import EmptyMessage from './EmptyMessage'

const ActiveSprintCards = () => {
  const { data: tasks } = useGetTasks()
  const { data: sprints } = useGetSprints()

  const activeSprints = sprints?.filter((sprint) => sprint.status !== 'done')

  const actualDate = new Date()

  const todayTimestamp = actualDate.setHours(0, 0, 0, 0)

  const validSprints = activeSprints?.filter(
    (sprint) => parseDate(sprint.endDate).setHours(0, 0, 0, 0) >= todayTimestamp
  )

  const ordenadSprints = validSprints?.sort(
    (sprintA, sprintB) =>
      parseDate(sprintA.endDate) - parseDate(sprintB.endDate)
  )

  const firstsSprints = ordenadSprints?.slice(0, 2)

  const activeSprintsInformation = firstsSprints?.map((sprint) => {
    const sprintTasks = tasks?.filter(
      (task) => task.sprintId === Number(sprint.id)
    )

    const doneTasks = sprintTasks?.filter((task) => task.status === 'done')

    const totalTasks = sprintTasks?.length

    const completedTasks = doneTasks?.length

    const taskProgress =
      totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

    const MILISEGUNDOS_EM_UM_DIA = 86400000

    const endDaysLeft = Math.ceil(
      (parseDate(sprint.endDate).setHours(0, 0, 0, 0) - todayTimestamp) /
        MILISEGUNDOS_EM_UM_DIA
    )

    return {
      id: sprint.id,
      title: sprint.title,
      status: statusVariants[sprint.status],
      badgeTitle: statusLabels[sprint.status],
      totalTasks: totalTasks,
      completedTasks: completedTasks,
      progress: taskProgress,
      endDays: endDaysLeft,
    }
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <p className="text-main font-display text-2xl">Active Sprints</p>
        <NavLink to="/sprints" className="text-smooth-blue text-base">
          View All Sprints
        </NavLink>
      </div>
      {activeSprintsInformation?.length === 0 ? (
        <div className="mt-5 flex justify-center">
          <EmptyMessage message="No active sprints yet!" />
        </div>
      ) : (
        <div
          className={`${activeSprintsInformation?.length > 1 ? 'grid grid-cols-2 gap-4' : 'grid grid-cols-1'}`}
        >
          {activeSprintsInformation?.map((sprint) => {
            return (
              <ActiveSprintCard
                key={sprint.id}
                title={sprint.title}
                status={sprint.status}
                badgeTitle={sprint.badgeTitle}
                endDays={sprint.endDays}
                progress={sprint.progress}
                progressBarSize="md"
                totalTasks={sprint.totalTasks}
                completedTasks={sprint.completedTasks}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ActiveSprintCards
