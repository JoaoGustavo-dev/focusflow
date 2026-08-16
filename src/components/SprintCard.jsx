import ProgressBar from './ProgressBar'
import StatusBadge from './StatusBadge'
import CardTitle from './CardTitle'
import Card from './Card'
import DateRange from './DateRange'

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
      <DateRange
        className="border-secondary border-t pt-1"
        startDate={startDate}
        endDate={endDate}
      />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="text-secondary text-sm">
            {completedTasks}/{totalTasks} tasks
          </p>
          <p className="text-main text-sm">{Math.round(progress)}%</p>
        </div>
        <ProgressBar progress={progress} color={color} size={size} />
      </div>
    </Card>
  )
}

export default SprintCard
