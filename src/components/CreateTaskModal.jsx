import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import './Modal.css'
import FlagIcon from '../assets/icons/flag.svg?react'
import CloseIcon from '../assets/icons/close.svg?react'
import Input from './Input'
import { useForm } from 'react-hook-form'
import TextArea from './TextArea'
import Select from './Select'
import { priorities, time } from '../utils/taskOptions'
import Button from './Button'
import SaveIcon from '../assets/icons/save.svg?react'
import { useCreateTask } from '../hooks/data/use-create-task'
import { toast } from 'sonner'

const CreateTaskModal = ({ sprintId, sprint, isOpen, onClose }) => {
  const nodeRef = useRef()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const { mutate: create, isPending: createTaskIsLoading } =
    useCreateTask(sprintId)

  const onSubmit = async (data) => {
    create(
      {
        sprintId: sprintId,
        title: data.title.trim(),
        description: data.description.trim(),
        status: 'pending',
        priority: data.priority,
        time: data.time,
      },
      {
        onSuccess: () => {
          toast.success('Task successfully created')
          reset()
          onClose()
        },
        onError: () => toast.error('Error on creating task'),
      }
    )
  }

  return createPortal(
    <CSSTransition
      in={isOpen}
      nodeRef={nodeRef}
      timeout={500}
      classNames="modal"
      unmountOnExit
    >
      <div
        ref={nodeRef}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur"
      >
        {/* dialog */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
          <div className="border-border flex w-full flex-col rounded-sm border">
            <div className="border-border bg-high-surface flex justify-between border-b px-6 py-5">
              <div className="flex flex-col gap-1">
                <p className="text-main text-2xl">New Task</p>
                <div className="flex items-center gap-1.5">
                  <span className="text-secondary text-xs">
                    {' '}
                    <FlagIcon />
                  </span>
                  <p className="text-secondary text-xs">Sprint: {sprint}</p>
                </div>
              </div>

              <button
                className="text-main hover:cursor-pointer"
                onClick={onClose}
                type="button"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="bg-surface border-border flex flex-col gap-5 border-b p-6">
              <Input
                id="title"
                label="Task Title"
                placeholder="Example: Develop search component"
                errorMessage={errors.title?.message}
                {...register('title', {
                  required: 'Title is required',
                  validate: (value) => {
                    if (!value.trim()) {
                      return "Title can't be empty."
                    }
                    return true
                  },
                })}
              />
              <TextArea
                id="description"
                label="Description"
                placeholder="Add details about the task..."
                rows={3}
                errorMessage={errors.description?.message}
                {...register('description', {
                  required: 'Description is required',
                  validate: (value) => {
                    if (!value.trim()) {
                      return "Description can't be empty"
                    }
                    return true
                  },
                })}
              />

              <Select
                id="priority"
                selectLabel="Priority"
                options={priorities}
                errorMessage={errors.priority?.message}
                {...register('priority', {
                  required: 'Priority is required',
                })}
              />

              <Select
                id="time"
                selectLabel="Time"
                options={time}
                errorMessage={errors.time?.message}
                {...register('time', {
                  required: 'Time is required',
                })}
              />
            </div>

            <div className="bg-high-surface border-border flex justify-between border-b px-6 py-4">
              <Button color="ghost" type="button" onClick={onClose}>
                Discard
              </Button>
              <Button type="submit" disabled={createTaskIsLoading}>
                <SaveIcon /> Create Task
              </Button>
            </div>
          </div>
        </form>
      </div>
    </CSSTransition>,
    document.body
  )
}

export default CreateTaskModal
