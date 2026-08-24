import { createPortal } from 'react-dom'
import './Modal.css'
import { CSSTransition } from 'react-transition-group'
import { useRef } from 'react'
import CloseIcon from '../assets/icons/close.svg?react'
import { useForm } from 'react-hook-form'
import Input from './Input'
import TextArea from './TextArea'
import Button from './Button'
import SaveIcon from '../assets/icons/save.svg?react'
import { toast } from 'sonner'
import { useUpdateSprint } from '../hooks/data/use-update-sprint'
import { parseISODate } from '../utils/parseISODate'
import { formatDateToISO } from '../utils/formatDateToISO'
import { formatDateToBR } from '../utils/formatDateToBR'

const EditSprintModal = ({ isOpen, onClose, sprint }) => {
  const nodeRef = useRef()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: sprint.title,
      description: sprint.description,
      startDate: formatDateToISO(sprint.startDate),
      endDate: formatDateToISO(sprint.endDate),
    },
  })

  const { mutate: updateSprint, isPending: updateSprintIsLoading } =
    useUpdateSprint(sprint.id)

  const onSubmit = async (data) => {
    updateSprint(
      {
        title: data.title.trim(),
        description: data.description.trim(),
        startDate: formatDateToBR(data.startDate),
        endDate: formatDateToBR(data.endDate),
      },
      {
        onSuccess: () => {
          toast.success('Sprint successfully updated')
          onClose()
        },
        onError: () => toast.error('Error on updating sprint'),
      }
    )
  }

  const endDays = (starDate, endDate) => {
    const MILISEGUNDOS_EM_UM_DIA = 86400000

    return (
      (parseISODate(endDate) - parseISODate(starDate)) / MILISEGUNDOS_EM_UM_DIA
    )
  }

  const days = endDays(watch('startDate'), watch('endDate'))

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
        className="fixed top-0 bottom-0 left-0 flex h-screen w-screen items-center justify-center backdrop-blur"
      >
        {/* dialog */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="border-border flex w-120 flex-col rounded-sm border">
            <div className="bg-high-surface border-border flex items-center justify-between border-b px-6 py-4">
              <p className="text-main font-display text-2xl">Edit Sprint</p>
              <button
                className="text-main hover:cursor-pointer"
                onClick={onClose}
                type="button"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="border-border bg-surface flex flex-col gap-5 border-b p-6">
              <Input
                id="title"
                label="Sprint Title"
                placeholder="Example: Create Sprint System"
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
                placeholder="Describe the main goals of this sprint..."
                rows={3}
                errorMessage={errors.description?.message}
                {...register('description', {
                  required: 'Description is required',
                  validate: (value) => {
                    if (!value.trim()) {
                      return "Description can't be empty."
                    }
                    return true
                  },
                })}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="startDate"
                  label="Start Date"
                  type="date"
                  errorMessage={errors.startDate?.message}
                  {...register('startDate', {
                    required: 'Start Date is required',
                  })}
                />
                <Input
                  id="endDate"
                  label="End date"
                  type="date"
                  errorMessage={errors.endDate?.message}
                  {...register('endDate', {
                    required: 'End Date is required',
                    validate: (value, formValue) => {
                      const startDate = formValue.startDate

                      if (startDate) {
                        if (startDate >= value) {
                          return 'End date must be after the start date'
                        }
                        return true
                      }

                      return true
                    },
                  })}
                />
              </div>

              {watch('startDate') && watch('endDate') && (
                <div className="bg-high-surface after:bg-smooth-blue relative flex gap-4 rounded-xs p-3 after:absolute after:top-0 after:left-0 after:h-full after:w-0.5 after:rounded-l-full after:content-['']">
                  <div className="bg-surface border-border flex h-12 w-12 items-center justify-center rounded-xs border">
                    <p className="text-smooth-blue text-2xl">{days}</p>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-main text-sm">Estimated Duration</p>
                    <p className="text-secondary text-[11px]">
                      This sprint will last approximately {days} calendar days.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-high-surface border-border flex justify-between border-b p-4">
              <Button color="ghost" onClick={onClose} type="button">
                Discard
              </Button>
              <Button type="submit" disabled={updateSprintIsLoading}>
                <SaveIcon /> Save changes
              </Button>
            </div>
          </div>
        </form>
      </div>
    </CSSTransition>,
    document.body
  )
}

export default EditSprintModal
