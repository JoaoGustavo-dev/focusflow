import { tv } from 'tailwind-variants'

const priorityBadge = tv({
  base: 'px-2 py-0.5 rounded-sm text-[11px] border text-center items-center flex',
  variants: {
    priority: {
      high: 'bg-high-priority/20 border-high-priority text-high-priority',
      medium:
        'bg-medium-priority/20 border-medium-priority text-medium-priority',
      low: 'bg-low-priority/20 border-low-priority text-low-priority',
    },
  },
})

const PriorityBadge = ({ priority, title }) => {
  return <div className={priorityBadge({ priority })}>{title}</div>
}

export default PriorityBadge
