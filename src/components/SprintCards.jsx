import { useGetSprints } from '../hooks/data/use-get-sprints'
import SprintCard from './SprintCard'
import PlusIcon from '../assets/icons/plus.svg?react'
import { statusLabels } from '../utils/statusLabels'
import { statusVariants } from '../utils/statusVariants'
import { useGetTasks } from '../hooks/data/use-get-tasks'
import EmptyState from './EmptyState'
import SprintsIcon from '../assets/icons/sprints.svg?react'
import { Fragment } from 'react'
import EmptyMessage from './EmptyMessage'
import { Link } from 'react-router-dom'

const SprintCards = ({ activefilter, onCreateSprintClick }) => {
  const { data: sprints } = useGetSprints()
  const { data: tasks } = useGetTasks()

  const selectedSprints = sprints?.filter((sprint) => {
    if (activefilter === 'all') {
      return true
    }

    return sprint.status === activefilter
  })

  const sprintsList = selectedSprints?.map((sprint) => {
    const totalTasks = tasks?.filter(
      (task) => task.sprintId === Number(sprint.id)
    )

    const completedTasks = totalTasks?.filter((task) => task.status === 'done')

    const progress =
      totalTasks?.length === 0
        ? 0
        : (completedTasks?.length / totalTasks?.length) * 100

    return {
      ...sprint,
      totalTasks: totalTasks?.length,
      completedTasks: completedTasks?.length,
      progress: progress,
    }
  })

  const emptyDB = sprints?.length === 0
  const emptyFilter = sprintsList?.length === 0 && !emptyDB

  return (
    <div
      className={`${emptyDB ? 'flex items-center justify-center' : emptyFilter ? 'flex items-center justify-center' : 'grid grid-cols-3 gap-4'}`}
    >
      {emptyDB ? (
        <EmptyState
          icon={<SprintsIcon width="48px" height="48px" />}
          title="No sprints found"
          subtitle="Start by defining a work cycle for your team."
          buttonText={
            <Fragment>
              <PlusIcon /> Create your first sprint
            </Fragment>
          }
        />
      ) : emptyFilter ? (
        <EmptyMessage
          message={`No sprints found with the ${statusLabels[activefilter]} status!`}
        />
      ) : (
        <Fragment>
          {sprintsList?.map((sprint) => {
            return (
              <Link to={`/sprints/${sprint?.id}`} key={sprint?.id}>
                <SprintCard
                  title={sprint?.title}
                  badgeTitle={statusLabels[sprint?.status]}
                  status={statusVariants[sprint?.status]}
                  subtitle={sprint?.description}
                  startDate={sprint?.startDate}
                  endDate={sprint?.endDate}
                  color={statusVariants[sprint?.status]}
                  size="md"
                  completedTasks={sprint?.completedTasks}
                  totalTasks={sprint?.totalTasks}
                  progress={sprint?.progress}
                />
              </Link>
            )
          })}
          <div className="bg-main/10 border-border flex h-[233.500px] w-full flex-col items-center justify-center gap-2 rounded-sm border border-dashed">
            <button
              className="bg-secondary flex h-12 w-12 items-center justify-center rounded-[50%] hover:cursor-pointer"
              onClick={onCreateSprintClick}
            >
              <PlusIcon />
            </button>
            <p className="text-secondary text-sm">Create new Sprint</p>
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default SprintCards
