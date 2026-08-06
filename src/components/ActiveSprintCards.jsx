import ActiveSprintCard from './ActiveSprintCard'
import { NavLink } from 'react-router-dom'

const ActiveSprintCards = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <p className="text-main font-display text-2xl">Active Sprints</p>
        <NavLink to="/sprints" className="text-smooth-blue text-base">
          View All Sprints
        </NavLink>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <ActiveSprintCard />
        <ActiveSprintCard />
      </div>
    </div>
  )
}

export default ActiveSprintCards
