import Header from '../components/Header'
import StatCards from '../components/StatCards'

const Home = () => {
  return (
    <div className="mr-14 flex flex-col gap-10 px-0.5 py-8">
      {/* Header */}
      <div>
        <Header
          title="Dashboard Overview"
          description="Real-time performance analytics and sprint health monitoring for your active development cycles."
        />
      </div>

      {/* Sprint Cards */}
      <StatCards />
    </div>
  )
}

export default Home
