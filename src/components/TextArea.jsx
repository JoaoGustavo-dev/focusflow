import { forwardRef } from 'react'
import InputErrorMessage from './InputErrorMessage'

const TextArea = forwardRef(({ label, errorMessage, rows, ...rest }, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={rest.id} className="text-main text-base">
          {label}
        </label>
      )}
      <textarea
        className="border-border text-main bg-high-surface placeholder:text-secondary resize-none rounded-sm border px-4 py-2 outline-none placeholder:text-sm"
        ref={ref}
        rows={rows}
        {...rest}
      />
      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </div>
  )
})

export default TextArea
