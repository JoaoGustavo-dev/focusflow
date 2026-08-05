import Card from './Card'
import CardTitle from './CardTitle'

const ActiveSprintCard = ({ title }) => {
  return (
    <Card>
      <div className="flex justify-between">
        <div>
          <CardTitle title={title} className="text-main text-lg" />
        </div>
      </div>
    </Card>
  )
}

export default ActiveSprintCard
