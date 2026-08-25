import { useNavigate, useParams } from 'react-router-dom'
import { useGetSprint } from '../hooks/data/use-get-sprint'
import StatusBadge from '../components/StatusBadge'
import { statusLabels } from '../utils/statusLabels'
import { statusVariants } from '../utils/statusVariants'
import DateRange from '../components/DateRange'
import Header from '../components/Header'
import Button from '../components/Button'
import EditIcon from '../assets/icons/edit.svg?react'
import ArrowLeftIcon from '../assets/icons/arrow-left.svg?react'
import TrashIcon from '../assets/icons/trash.svg?react'
import SprintStatCards from '../components/SprintStatCards'
import SprintBacklog from '../components/SprintBacklog'
import { useState } from 'react'
import DeleteModal from '../components/DeleteModal'
import { useDeleteSprint } from '../hooks/data/use-delete-sprint'
import { toast } from 'sonner'
import { useGetTasks } from '../hooks/data/use-get-tasks'
import { useDeleteTask } from '../hooks/data/use-delete-task'
import CreateTaskModal from '../components/CreateTaskModal'
import EditSprintModal from '../components/EditSprintModal'
import Skeleton from '../components/Skeleton'
import { Fragment } from 'react'

const SprintDetails = () => {
  const { sprintId } = useParams()

  const id = sprintId

  const { data: sprint, isPending: sprintIsLoading } = useGetSprint(id)
  const pageBack = useNavigate()

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const { mutate: toDelete, isPending: deleteSprintIsPending } =
    useDeleteSprint(id)

  const { data: tasks } = useGetTasks(id)

  const { mutate: deleteTask } = useDeleteTask(id)

  const handleDeleteClick = () => {
    return setDeleteModalIsOpen(true)
  }

  const handleCloseModalClick = () => {
    return setDeleteModalIsOpen(false)
  }
  const [createTaskModalIsOpen, setCreateTaskModalIsOpen] = useState(false)

  const handleCreateTaskClick = () => {
    return setCreateTaskModalIsOpen(true)
  }
  const handleCreateTaskModalClose = () => {
    return setCreateTaskModalIsOpen(false)
  }

  const [editSprintModalIsOpen, setEditSprintModalIsOpen] = useState(false)

  const handleEditSprintModalClick = () => {
    return setEditSprintModalIsOpen(true)
  }
  const handleEditSprintModalClose = () => {
    return setEditSprintModalIsOpen(false)
  }

  const handleDeleteSprint = () => {
    toDelete(undefined, {
      onSuccess: () => {
        tasks?.forEach((task) => {
          deleteTask(task.id)
        })
        toast.success('Sprint successfully deleted')
        pageBack(-1)
      },
      onError: () => toast.error('Error on deleting sprint'),
    })
  }

  return (
    <div className="flex min-w-0 flex-col gap-8 p-6 lg:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-2">
          <button
            className="bg-secondary mb-1 self-start rounded-[50%] p-2 hover:cursor-pointer"
            onClick={() => pageBack(-1)}
          >
            <ArrowLeftIcon />
          </button>
          <div className="flex flex-wrap items-center gap-3">
            {sprintIsLoading ? (
              <Fragment>
                <Skeleton className="h-6 w-11" />
                <Skeleton className="h-6 w-52" />
              </Fragment>
            ) : (
              <Fragment>
                <StatusBadge
                  status={statusVariants[sprint?.status]}
                  title={statusLabels[sprint?.status]}
                />
                <DateRange
                  startDate={sprint?.startDate}
                  endDate={sprint?.endDate}
                />
              </Fragment>
            )}
          </div>
          {sprintIsLoading ? (
            <Skeleton className="h-18 w-100" />
          ) : (
            <Header title={sprint?.title} description={sprint?.description} />
          )}
        </div>
        <div className="flex w-full gap-2 sm:w-auto">
          <Button color="secondary" onClick={handleEditSprintModalClick}>
            <EditIcon /> Edit sprint
          </Button>
          <Button color="danger" onClick={handleDeleteClick}>
            <TrashIcon /> Delete sprint
          </Button>
        </div>
      </div>

      <SprintStatCards id={id} />

      <SprintBacklog sprintId={id} createTask={handleCreateTaskClick} />
      <DeleteModal
        title="Delete Sprint?"
        description="This action cannot be undone"
        isOpen={deleteModalIsOpen}
        onConfirm={handleDeleteSprint}
        onClose={handleCloseModalClick}
        isLoading={deleteSprintIsPending}
      />

      <CreateTaskModal
        sprintId={id}
        isOpen={createTaskModalIsOpen}
        sprint={sprint?.title}
        onClose={handleCreateTaskModalClose}
      />
      {sprint && (
        <EditSprintModal
          isOpen={editSprintModalIsOpen}
          onClose={handleEditSprintModalClose}
          sprint={sprint}
        />
      )}
    </div>
  )
}

export default SprintDetails
