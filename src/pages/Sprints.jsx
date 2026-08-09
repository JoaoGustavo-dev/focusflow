import Header from '../components/Header'
import Button from '../components/Button'
import PlusIcon from '../assets/icons/plus.svg?react'

const Sprints = () => {
  return (
    <div className="flex flex-col gap-6 p-10">
      <div className="flex items-center justify-between">
        <Header title="Sprints" description="Manage your team's work cycles." />
        <Button>
          <PlusIcon />
          Nova Sprint
        </Button>
      </div>
    </div>
  )
}

export default Sprints
