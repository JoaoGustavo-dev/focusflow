import { tv } from 'tailwind-variants'

const progressStyles = tv({
  slots: {
    track: 'bg-border w-full rounded-full overflow-hidden',
    fill: 'h-full rounded-full',
  },
  variants: {
    size: {
      sm: { track: 'h-1', fill: 'h-1' },
      md: { track: 'h-2', fill: 'h-2' },
    },
    color: {
      active: { fill: 'bg-in-progress-status' },
      done: { fill: 'bg-done-status' },
      neutral: { fill: 'bg-main' },
    },
  },
})

const ProgressBar = ({ progress, color = 'neutral', size = 'sm' }) => {
  const { track, fill } = progressStyles({ size, color })

  return (
    <div className={track()}>
      <div className={fill()} style={{ width: `${progress}%` }} />
    </div>
  )
}

export default ProgressBar
