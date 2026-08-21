import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import './Modal.css'
import CloseIcon from '../assets/icons/close.svg?react'
import Input from './Input'
import TextArea from './TextArea'
import Button from './Button'
import SaveIcon from '../assets/icons/save.svg?react'

const CreateSprintModal = ({ isOpen, onClose }) => {
  const nodeRef = useRef()

  return createPortal(
    <CSSTransition
      in={isOpen}
      nodeRef={nodeRef}
      timeout={500}
      unmountOnExit
      classNames="modal"
    >
      <div
        ref={nodeRef}
        className="fixed top-0 bottom-0 left-0 flex h-screen w-screen items-center justify-center backdrop-blur"
      >
        {/* dialog */}
        <div className="border-border flex w-120 flex-col rounded-sm border">
          <div className="bg-high-surface border-border flex items-center justify-between border-b px-6 py-4">
            <p className="text-main font-display text-2xl">New Sprint</p>
            <button
              className="text-main hover:cursor-pointer"
              onClick={onClose}
            >
              <CloseIcon />
            </button>
          </div>

          <div className="border-border bg-surface flex flex-col gap-5 border-b p-6">
            <Input
              label="Sprint Title"
              placeholder="Example: Create Sprint System"
            />
            <TextArea
              label="Description"
              placeholder="Describe the main goals of this sprint..."
              rows={3}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Start Date" type="date" />
              <Input label="End date" type="date" />
            </div>

            <div className="bg-high-surface after:bg-smooth-blue relative flex gap-4 rounded-xs p-3 after:absolute after:top-0 after:left-0 after:h-full after:w-0.5 after:rounded-l-full after:content-['']">
              <div className="bg-surface border-border flex h-12 w-12 items-center justify-center rounded-xs border">
                <p className="text-smooth-blue text-2xl">30</p>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-main text-sm">Estimated Duration</p>
                <p className="text-secondary text-[11px]">
                  This sprint will last approximately 30 calendar days.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-high-surface border-border flex justify-between border-b p-4">
            <Button color="ghost" onClick={onClose}>
              Descartar
            </Button>
            <Button>
              <SaveIcon /> Save changes
            </Button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.body
  )
}

export default CreateSprintModal
