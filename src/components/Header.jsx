const Header = ({ title, description }) => {
  return (
    <div>
      <p className="text-main font-display text-[32px]">{title}</p>
      <p className="text-secondary text-base">{description}</p>
    </div>
  )
}

export default Header
