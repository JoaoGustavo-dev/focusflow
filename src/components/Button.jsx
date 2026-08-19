import { tv } from 'tailwind-variants'

const button = tv({
  base: 'flex items-center justify-center font-semibold rounded-sm transition hover:opacity-75 hover:cursor-pointer gap-2',
  variants: {
    size: {
      md: 'px-4 py-2 text-xs ',
      lg: 'px-6 py-3 text-base',
    },
    color: {
      primary: 'text-main bg-primary-status',
      secondary: 'text-secondary bg-transparent border border-border',
      ghost: 'bg-transparent text-secondary',
      danger: 'bg-high-priority text-main',
    },
    disabled: {
      true: 'cursor-not-allowed opacity-50 hover:opacity-50',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
})
const Button = ({ children, color = 'primary', size = 'md', ...rest }) => {
  return (
    <button
      type="button"
      className={button({ color, size, disabled: rest.disabled })}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
