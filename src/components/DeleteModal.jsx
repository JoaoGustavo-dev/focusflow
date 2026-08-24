import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import './Modal.css'
import { createPortal } from 'react-dom'
import DangerIcon from '../assets/icons/danger.svg?react'
import Button from './Button'

const DeleteModal = ({
  title,
  description,
  isOpen,
  onConfirm,
  onClose,
  isLoading,
}) => {
  const nodeRef = useRef()

  return createPortal(
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="modal"
      unmountOnExit
    >
      <div
        ref={nodeRef}
        className="fixed top-0 bottom-0 left-0 flex h-screen w-screen items-center justify-center backdrop-blur"
      >
        {/* dialog */}
        <div className="border-border flex flex-col border">
          <div className="bg-high-surface border-b-border flex flex-col gap-1 p-4">
            <div className="flex items-center gap-2">
              <p className="text-high-priority">
                <DangerIcon />
              </p>
              <p className="text-main text-base">{title}</p>
            </div>
            <p className="text-secondary text-[12px]">{description}</p>
          </div>

          <div className="flex items-end gap-2 p-3">
            <Button color="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button color="danger" onClick={onConfirm} disabled={isLoading}>
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.body
  )
}

export default DeleteModal
