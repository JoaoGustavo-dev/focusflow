import SidebarButton from './SidebarButton'
import DashboardIcon from '../assets/icons/dashboard.svg?react'
import SprintsIcon from '../assets/icons/sprints.svg?react'

const Sidebar = () => {
  return (
    <aside className="bg-high-surface sticky top-0 hidden h-screen w-full flex-col gap-8 lg:flex">
      <div className="flex flex-col gap-8 px-10 pt-8">
        <div className="flex flex-col items-center">
          <p className="text-smooth-blue font-display text-2xl">FocusFlow</p>

          <p className="font-body text-sidebar-description text-xs">
            Deep Work Engine
          </p>
        </div>

        <nav className="flex flex-col items-center">
          <SidebarButton to="/">
            <DashboardIcon />
            Dashboard
          </SidebarButton>

          <SidebarButton to="/sprints">
            <SprintsIcon />
            Sprints
          </SidebarButton>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
