import PriorityBadge from './PriorityBadge'
import StatusBadge from './StatusBadge'
import TaskCheckbox from './TaskCheckbox'
import Button from './Button'
import TaskTime from './TaskTime'
import { useUpdateTask } from '../hooks/data/use-update-task'
import { useDeleteTask } from '../hooks/data/use-delete-task'
import { nextTaskStatus } from '../utils/nextTaskStatus'
import { toast } from 'sonner'
import TrashIcon from '../assets/icons/trash.svg?react'
import { useState } from 'react'
import DeleteModal from './DeleteModal'

const TaskRow = ({
  title,
  description,
  status,
  sprintId,
  taskId,
  priority,
  priorityBadgeTitle,
  statusBadgeTitle,
  time,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const { mutate } = useUpdateTask(sprintId, taskId)

  const { mutate: deleteTask, isPending: deleteTaskLoading } = useDeleteTask(
    sprintId,
    taskId
  )

  const taskNewStatus = (status) => {
    return nextTaskStatus[status]
  }

  const handleCheckBoxClick = (taskStatus) => {
    mutate(
      {
        status: taskNewStatus(taskStatus),
      },
      {
        onSuccess: () => toast.success('Task status successfully updated'),
        onError: () => toast.error('Error on updating task'),
      }
    )
  }

  const handleDeleteClick = () => {
    return setIsDeleteModalOpen(true)
  }
  const handleCloseModalClick = () => {
    return setIsDeleteModalOpen(false)
  }

  const handleDeleteTask = () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success('Task successfully deleted')
        setIsDeleteModalOpen(false)
      },
      onError: () => toast.error('Error on deleting task'),
    })
  }

  return (
    <div className="border-border flex items-start justify-between border-b p-4">
      <div className="flex gap-4">
        <TaskCheckbox
          id={taskId}
          status={status}
          onToggle={() => handleCheckBoxClick(status)}
        />
        <div className="flex flex-col">
          <div className="flex flex-col">
            <p className="text-main text-base">{title}</p>
            <p className="text-secondary text-[12px]">{description}</p>
          </div>

          <div className="flex gap-2 pt-1">
            <PriorityBadge priority={priority} title={priorityBadgeTitle} />
            <StatusBadge status={status} title={statusBadgeTitle} />
            <TaskTime time={time} />
          </div>
        </div>
      </div>

      <Button color="danger" onClick={handleDeleteClick}>
        <TrashIcon />
      </Button>
      <DeleteModal
        title="Delete Task?"
        description="This action cannot be undone"
        isOpen={isDeleteModalOpen}
        onConfirm={handleDeleteTask}
        onClose={handleCloseModalClick}
        isLoading={deleteTaskLoading}
      />
    </div>
  )
}

export default TaskRow
