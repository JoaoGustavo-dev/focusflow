import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const Layout = () => {
  return (
    <div className="bg-background grid h-screen w-screen grid-cols-[16rem_1fr] gap-16">
      <Sidebar />
      <div className="home h-full min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
