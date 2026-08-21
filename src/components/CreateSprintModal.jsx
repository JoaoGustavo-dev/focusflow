import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'

const CreateSprintModal = ({ isOpen }) => {
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
      </div>
    </CSSTransition>,
    document.body
  )
}

export default CreateSprintModal
