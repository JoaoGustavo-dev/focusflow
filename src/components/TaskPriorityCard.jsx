import Card from './Card'
import CardTitle from './CardTitle'
import StatusBadge from './StatusBadge'

const TaskPriorityCard = ({ title, sprintName, badgeTitle, status }) => {
  return (
    <Card>
      <div className="flex justify-between gap-4">
        <div className="min-w-0">
          <CardTitle title={title} className="text-main text-base" />
          <p className="text-secondary text-base">Sprint: {sprintName}</p>
        </div>

        <div>
          <StatusBadge title={badgeTitle} status={status} />
        </div>
      </div>
    </Card>
  )
}

export default TaskPriorityCard
