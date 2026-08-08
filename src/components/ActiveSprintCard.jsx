import Card from './Card'
import CardTitle from './CardTitle'
import StatusBadge from './StatusBadge'
import ProgressBar from './ProgressBar'

const ActiveSprintCard = ({
  title,
  status,
  badgeTitle,
  endDays,
  progress,
  progressBarSize,
  totalTasks,
  completedTasks,
}) => {
  return (
    <Card>
      <div className="flex justify-between">
        <div className="flex min-w-0 flex-col items-start gap-1.5">
          <CardTitle title={title} className="text-main text-lg" />
          <StatusBadge status={status} title={badgeTitle} />
        </div>
        <div className="flex shrink-0 flex-col items-end">
          <p className="text-secondary text-base">Ending in</p>
          <p className="text-main text-base">
            {endDays === 0 ? 'Last day' : `${endDays} days left`}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="text-secondary text-[11px]">Progress</p>
          <p className="text-main text-[11px]">{Math.round(progress)}%</p>
        </div>
        <ProgressBar
          progress={progress}
          color={status}
          size={progressBarSize}
        />
      </div>

      <div className="flex justify-end">
        <p className="text-secondary text-base">
          {completedTasks}/{totalTasks} tasks
        </p>
      </div>
    </Card>
  )
}

export default ActiveSprintCard
