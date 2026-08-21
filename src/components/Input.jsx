import { forwardRef } from 'react'
import InputErrorMessage from './InputErrorMessage'

const Input = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={rest.id} className="text-main text-base">
          {label}
        </label>
      )}
      <input
        className="border-border text-main bg-high-surface placeholder:text-secondary rounded-sm border px-4 py-2 outline-none placeholder:text-sm"
        ref={ref}
        {...rest}
      />
      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </div>
  )
})

export default Input
