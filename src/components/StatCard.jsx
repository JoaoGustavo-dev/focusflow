import Card from './Card'
import CardTitle from './CardTitle'
import ProgressBar from './ProgressBar'

const StatCard = ({ title, icon, number, color, size, progress }) => {
  return (
    <Card>
      <div className="text-secondary flex min-w-0 items-center justify-between">
        <CardTitle title={title} className="truncate text-sm" />
        <p className="shrink-0">{icon}</p>
      </div>
      <div>
        <p className="text-main text-3xl">{number}</p>
      </div>
      <ProgressBar color={color} size={size} progress={progress} />
    </Card>
  )
}

export default StatCard
