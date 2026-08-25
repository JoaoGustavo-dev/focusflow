import ActiveSprintCards from '../components/ActiveSprintCards'
import Header from '../components/Header'
import StatCards from '../components/StatCards'
import TaskPriorityCards from '../components/TaskPriorityCards'

const Home = () => {
  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div>
        <Header
          title="Dashboard Overview"
          description="Real-time performance analytics and sprint health monitoring for your active development cycles."
        />
      </div>

      {/* Dashboard Cards */}
      <StatCards />

      {/* Active Sprint Cards */}
      <ActiveSprintCards />

      {/* High Priority Tasks */}
      <TaskPriorityCards />
    </div>
  )
}

export default Home
