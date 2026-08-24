const Skeleton = ({ className }) => {
  return (
    <div
      className={`bg-surface border-border animate-pulse rounded-sm border ${className}`}
    ></div>
  )
}

export default Skeleton
