import { tv } from 'tailwind-variants'

const badge = tv({
  base: 'px-2 py-1 text-[11px] text-center border self-start',
  variants: {
    status: {
      active:
        'bg-in-progress-status/10 text-in-progress-status border-in-progress-status/20',
      done: 'bg-done-status/10 text-done-status border-done-status/20',
      neutral:
        'bg-pending-status/10 text-pending-status border-pending-status/20',
    },
  },
})

const StatusBadge = ({ status, title }) => {
  return <div className={badge({ status })}>{title}</div>
}

export default StatusBadge
