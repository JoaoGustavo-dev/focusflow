import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const Layout = () => {
  return (
    <div className="bg-background grid min-h-screen w-full grid-cols-1 lg:grid-cols-[16rem_minmax(0,1fr)]">
      <Sidebar />

      <main className="home min-w-0 overflow-x-hidden overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
