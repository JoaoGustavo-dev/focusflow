import Header from '../components/Header'
import Button from '../components/Button'
import PlusIcon from '../assets/icons/plus.svg?react'
import Tabs from '../components/Tabs'
import { useState } from 'react'
import SprintCards from '../components/SprintCards'
import CreateSprintModal from '../components/CreateSprintModal'

const Sprints = () => {
  const [active, setActive] = useState('all')
  const [createSprintModalIsOpen, setCreateSprintModalIsOpen] = useState(false)

  const handleCreateSprintModalClick = () => {
    return setCreateSprintModalIsOpen(true)
  }
  const handleCreateSprintModalClose = () => {
    return setCreateSprintModalIsOpen(false)
  }

  return (
    <div className="flex min-w-0 flex-col gap-6 p-6 lg:p-8 xl:p-10">
      <div className="border-border flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
        <Header title="Sprints" description="Manage your team's work cycles." />
        <Button onClick={handleCreateSprintModalClick}>
          <PlusIcon />
          New Sprint
        </Button>
      </div>

      <Tabs activeOption={active} filterFunction={setActive} />

      <SprintCards
        onCreateSprintClick={handleCreateSprintModalClick}
        activefilter={active}
      />
      <CreateSprintModal
        isOpen={createSprintModalIsOpen}
        onClose={handleCreateSprintModalClose}
      />
    </div>
  )
}

export default Sprints
