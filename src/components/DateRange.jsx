import CallendarIcon from '../assets/icons/callendar.svg?react'

const DateRange = ({ startDate, endDate, className }) => {
  return (
    <div
      className={`text-secondary flex items-center gap-2 self-start ${className}`}
    >
      <CallendarIcon />
      <p>
        {startDate} - {endDate}
      </p>
    </div>
  )
}

export default DateRange
