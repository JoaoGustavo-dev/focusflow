import { useGetTasks } from '../hooks/data/use-get-tasks'
import StatCard from '../components/StatCard'
import PendingIcon from '../assets/icons/pending.svg?react'
import ActiveIcon from '../assets/icons/active.svg?react'
import DoneIcon from '../assets/icons/done.svg?react'

const SprintStatCards = ({ id }) => {
  const { data: tasks } = useGetTasks(id)

  const totalTasks = tasks?.length

  const pendingTasks = tasks?.filter((task) => task.status === 'pending').length
  const inProgressTasks = tasks?.filter(
    (task) => task.status === 'in-progress'
  ).length
  const doneTasks = tasks?.filter((task) => task.status === 'done').length

  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard title="Total Tasks" number={totalTasks} />
      <StatCard
        title="Pending Tasks"
        icon={<PendingIcon />}
        number={pendingTasks}
      />
      <StatCard
        title="Active Tasks"
        icon={<ActiveIcon />}
        number={inProgressTasks}
      />
      <StatCard title="Done Tasks" icon={<DoneIcon />} number={doneTasks} />
    </div>
  )
}

export default SprintStatCards
