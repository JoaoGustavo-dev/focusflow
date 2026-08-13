const EmptyMessage = ({ message, className = '' }) => {
  return <p className={`text-main text-3xl ${className}`}>{message}</p>
}

export default EmptyMessage
