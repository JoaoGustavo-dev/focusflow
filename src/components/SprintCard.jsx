import ProgressBar from './ProgressBar'
import StatusBadge from './StatusBadge'
import CardTitle from './CardTitle'
import CallendarIcon from '../assets/icons/callendar.svg?react'
import Card from './Card'

const SprintCard = ({
  status,
  title,
  subtitle,
  badgeTitle,
  startDate,
  endDate,
  totalTasks,
  completedTasks,
  progress,
  color,
  size,
}) => {
  return (
    <Card>
      <div className="self-start">
        <StatusBadge title={badgeTitle} status={status} />
      </div>
      <div className="flex flex-col gap-1">
        <CardTitle title={title} className="text-main text-lg" />
        <p className="text-secondary text-sm">{subtitle}</p>
      </div>
      <div className="border-secondary text-secondary flex items-center gap-2 self-start border-t pt-1">
        <CallendarIcon />
        <p>
          {startDate} - {endDate}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="text-secondary text-sm">
            {completedTasks}/{totalTasks} tasks
          </p>
          <p className="text-main text-sm">{progress}%</p>
        </div>
        <ProgressBar progress={progress} color={color} size={size} />
      </div>
    </Card>
  )
}

export default SprintCard
