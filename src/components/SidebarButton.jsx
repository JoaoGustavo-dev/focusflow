import { NavLink } from 'react-router-dom'
import { tv } from 'tailwind-variants'

const button = tv({
  base: 'flex items-center gap-3 px-4 py-3 rounded-sm w-51.75 h-11 relative text-sm',
  variants: {
    status: {
      selected:
        'text-smooth-blue bg-surface-selected after:absolute after:right-0 after:top-0 after:h-full after:w-0.5 after:bg-smooth-blue after:rounded-l-full',
      unselected: 'bg-transparent text-secondary',
    },
  },
})

const SidebarButton = ({ children, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        button({ status: isActive ? 'selected' : 'unselected' })
      }
    >
      {children}
    </NavLink>
  )
}

export default SidebarButton
