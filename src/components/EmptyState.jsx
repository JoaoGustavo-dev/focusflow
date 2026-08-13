import Button from './Button'

const EmptyState = ({ icon, title, subtitle, buttonText, onClick }) => {
  return (
    <div className="mt-5 flex flex-col items-center justify-center gap-6">
      <div className="bg-secondary/10 border-border flex items-center justify-center rounded-sm border p-10">
        <span className="text-smooth-blue">{icon}</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-main text-3xl">{title}</h2>
        <p className="text-secondary text-base">{subtitle}</p>
      </div>

      <Button size="lg" color="primary" onClick={onClick}>
        {buttonText}
      </Button>
    </div>
  )
}

export default EmptyState
