import { forwardRef } from 'react'
import InputErrorMessage from './InputErrorMessage'

const Select = forwardRef(
  ({ selectLabel, errorMessage, options, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {selectLabel && (
          <label htmlFor={rest.id} className="text-main text-base">
            {selectLabel}
          </label>
        )}

        <select
          className="border-border text-main bg-high-surface rounded-sm border px-3 py-2 outline-none"
          ref={ref}
          {...rest}
        >
          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            )
          })}
        </select>
        {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
      </div>
    )
  }
)

export default Select
