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
import EditIcon from '../assets/icons/edit.svg?react'
import EditTaskModal from './EditTaskModal'

const TaskRow = ({
  title,
  description,
  status,
  checkBoxStatus,
  task,
  sprintId,
  taskId,
  priority,
  priorityBadgeTitle,
  statusBadgeTitle,
  time,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false)

  const { mutate } = useUpdateTask(sprintId, taskId)

  const { mutate: deleteTask, isPending: deleteTaskLoading } =
    useDeleteTask(sprintId)

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
    deleteTask(taskId, {
      onSuccess: () => {
        toast.success('Task successfully deleted')
        handleCloseModalClick()
      },
      onError: () => toast.error('Error on deleting task'),
    })
  }

  const handleEditClick = () => {
    return setIsEditTaskModalOpen(true)
  }
  const handleCloseEditModalClick = () => {
    return setIsEditTaskModalOpen(false)
  }

  return (
    <div className="border-border flex items-center justify-between border p-4">
      <div className="flex gap-4">
        <TaskCheckbox
          id={taskId}
          status={checkBoxStatus}
          onToggle={() => handleCheckBoxClick(checkBoxStatus)}
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

      <div className="flex gap-3">
        <Button color="secondary" onClick={handleEditClick}>
          <EditIcon /> Edit Task
        </Button>
        <Button color="danger" onClick={handleDeleteClick}>
          <TrashIcon />
        </Button>
      </div>
      <DeleteModal
        title="Delete Task?"
        description="This action cannot be undone"
        isOpen={isDeleteModalOpen}
        onConfirm={handleDeleteTask}
        onClose={handleCloseModalClick}
        isLoading={deleteTaskLoading}
      />

      {task && (
        <EditTaskModal
          isOpen={isEditTaskModalOpen}
          onClose={handleCloseEditModalClick}
          sprintId={sprintId}
          taskId={taskId}
          task={task}
        />
      )}
    </div>
  )
}

export default TaskRow
