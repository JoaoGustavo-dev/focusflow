import StatCard from './StatCard'
import TotalTasksIcon from '../assets/icons/totalTasks.svg?react'
import { useGetTasks } from '../hooks/data/use-get-tasks'
import SprintsIcon from '../assets/icons/sprints.svg?react'
import { useGetSprints } from '../hooks/data/use-get-sprints'
import CompletedIcon from '../assets/icons/completed.svg?react'
import { statusVariants } from '../utils/statusVariants'
import Skeleton from './Skeleton'
import { Fragment } from 'react'

const StatCards = () => {
  const { data: tasks, isPending: tasksisLoading } = useGetTasks()
  const { data: sprints, isPending: sprintsisLoading } = useGetSprints()

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
      {tasksisLoading ? (
        <Fragment>
          <Skeleton className="h-34" />
          <Skeleton className="h-34" />
        </Fragment>
      ) : (
        <Fragment>
          <StatCard
            title="Total Tasks"
            icon={<TotalTasksIcon />}
            number={tasks?.length}
            color={statusVariants.pending}
            size="sm"
            progress={totalActiveTasks}
          />
          <StatCard
            title="Completed Tasks"
            icon={<CompletedIcon />}
            number={completedTasks}
            color={statusVariants.done}
            size="sm"
            progress={totalTasksProgress}
          />
        </Fragment>
      )}
      {sprintsisLoading ? (
        <Fragment>
          <Skeleton className="h-34" />
          <Skeleton className="h-34" />
        </Fragment>
      ) : (
        <Fragment>
          <StatCard
            title="Current Sprints"
            icon={<SprintsIcon />}
            number={activeSprints}
            color={statusVariants['in-progress']}
            size="sm"
            progress={totalActiveSprints}
          />
          <StatCard
            title="Completed Sprints"
            icon={<CompletedIcon />}
            number={completedSprints}
            color={statusVariants.done}
            size="sm"
            progress={totalCompletedSprints}
          />
        </Fragment>
      )}
    </div>
  )
}

export default StatCards
