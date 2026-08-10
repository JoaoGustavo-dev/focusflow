import Header from '../components/Header'
import Button from '../components/Button'
import PlusIcon from '../assets/icons/plus.svg?react'
import Tabs from '../components/Tabs'
import { useState } from 'react'

const Sprints = () => {
  const [active, setActive] = useState('All')

  return (
    <div className="flex flex-col gap-6 p-10">
      <div className="border-border flex items-center justify-between border-b pb-4">
        <Header title="Sprints" description="Manage your team's work cycles." />
        <Button>
          <PlusIcon />
          Nova Sprint
        </Button>
      </div>

      <Tabs activeOption={active} filterFunction={setActive} />
    </div>
  )
}

export default Sprints
