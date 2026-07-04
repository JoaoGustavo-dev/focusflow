const Sidebar = () => {
  return (
    <div className="bg-high-surface sticky top-0 hidden h-screen flex-col gap-8 md:flex">
      {/* Chamada Sidebar */}
      <div className="flex flex-col gap-1 px-10 pt-8">
        <p className="text-smooth-blue font-display text-2xl">FocusFlow</p>
        <p className="font-body text-sidebar-description text-xs">
          Deep Work Engine
        </p>
      </div>
    </div>
  )
}

export default Sidebar
