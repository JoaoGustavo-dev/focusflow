import SprintCard from './SprintCard'
import TotalTasksIcon from '../assets/icons/totalTasks.svg?react'
import { useGetTasks } from '../hooks/data/use-get-tasks'
import SprintsIcon from '../assets/icons/sprints.svg?react'
import { useGetSprints } from '../hooks/data/use-get-sprints'
import CompletedIcon from '../assets/icons/completed.svg?react'

const SprintCards = () => {
  const { data: tasks } = useGetTasks()
  const { data: sprints } = useGetSprints()

  const activeSprints = sprints?.filter(
    (sprint) => sprint.status !== 'done'
  ).length
  const totalActiveSprints = (activeSprints / sprints?.length) * 100

  const completedSprints = sprints?.filter(
    (sprint) => sprint.status === 'done'
  ).length
  const totalCompletedSprints = (completedSprints / sprints?.length) * 100

  const completedTasks = tasks?.filter((task) => task.status === 'done').length
  const activeTasks = tasks?.filter((task) => task.status !== 'done').length

  const totalTasksProgress = (completedTasks / tasks?.length) * 100
  const totalActiveTasks = (activeTasks / tasks?.length) * 100

  return (
    <div className="grid grid-cols-4 gap-4">
      <SprintCard
        title="Total Tasks"
        icon={<TotalTasksIcon />}
        number={tasks?.length}
        bg="bg-white"
        progress={totalActiveTasks}
      />
      <SprintCard
        title="Active Sprints"
        icon={<SprintsIcon />}
        number={activeSprints}
        bg="bg-primary-status"
        progress={totalActiveSprints}
      />
      <SprintCard
        title="Completed Sprints"
        icon={<CompletedIcon />}
        number={completedSprints}
        bg="bg-smooth-blue"
        progress={totalCompletedSprints}
      />
      <SprintCard
        title="Completed Tasks"
        icon={<CompletedIcon />}
        number={completedTasks}
        bg="bg-smooth-blue"
        progress={totalTasksProgress}
      />
    </div>
  )
}

export default SprintCards
