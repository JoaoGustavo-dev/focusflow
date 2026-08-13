import { useGetSprints } from '../hooks/data/use-get-sprints'
import SprintCard from './SprintCard'
import PlusIcon from '../assets/icons/plus.svg?react'
import { statusLabels } from '../utils/statusLabels'
import { statusVariants } from '../utils/statusVariants'
import { useGetTasks } from '../hooks/data/use-get-tasks'

const SprintCards = ({ activefilter }) => {
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

  return (
    <div className="grid grid-cols-3 gap-4">
      {sprintsList?.map((sprint) => {
        return (
          <SprintCard
            key={sprint.id}
            title={sprint?.title}
            badgeTitle={statusLabels[sprint?.status]}
            status={statusVariants[sprint?.status]}
            subtitle={sprint?.description}
            startDate={sprint?.startDate}
            endDate={sprint?.endDate}
            color={statusVariants[sprint?.status]}
            size="md"
            completedTasks={sprint.completedTasks}
            totalTasks={sprint.totalTasks}
            progress={sprint.progress}
          />
        )
      })}
      <div className="bg-main/10 border-border flex h-[233.500px] w-full flex-col items-center justify-center gap-2 rounded-sm border border-dashed">
        <button className="bg-secondary flex h-12 w-12 items-center justify-center rounded-[50%] hover:cursor-pointer">
          <PlusIcon />
        </button>
        <p className="text-secondary text-sm">Criar Nova Sprint</p>
      </div>
    </div>
  )
}

export default SprintCards
