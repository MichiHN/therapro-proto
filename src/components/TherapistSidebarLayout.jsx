import { useState } from "react"
import { Link } from "react-router-dom"
import { LayoutDashboard, Gift, Gamepad2, Users, Menu, LogOut } from "lucide-react"

export default function TherapistSidebarLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const handleLogout = () => {
  localStorage.removeItem("user")
  window.location.href = "/therapro-proto/login"
}

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-white border-r transition-all p-4 flex flex-col ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className={`font-bold text-lg ${sidebarOpen ? "" : "hidden"}`}>
            TheraPro
          </div>
          <button
            aria-label="Toggle sidebar"
            onClick={() => setSidebarOpen((s) => !s)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <Menu size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-4 flex-1">
          <Link
            to="/therapist/dashboard"
            className="flex items-center gap-3 hover:text-green-600 transition text-lg"
          >
            <LayoutDashboard size={24} />
            <span className={`${sidebarOpen ? "" : "hidden"}`}>Dashboard</span>
          </Link>

          <Link
            to="/therapist/rewards"
            className="flex items-center gap-3 hover:text-green-600 transition text-lg"
          >
            <Gift size={24} />
            <span className={`${sidebarOpen ? "" : "hidden"}`}>Rewards</span>
          </Link>

          <Link
            to="/therapist/activities"
            className="flex items-center gap-3 hover:text-green-600 transition text-lg"
          >
            <Gamepad2 size={24} />
            <span className={`${sidebarOpen ? "" : "hidden"}`}>Activities</span>
          </Link>

          <Link
            to="/therapist/assigned-children"
            className="flex items-center gap-3 hover:text-green-600 transition text-lg"
          >
            <Users size={24} />
            <span className={`${sidebarOpen ? "" : "hidden"}`}>Assigned Children</span>
          </Link>
        </nav>

        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 m-4 bg-red-600 rounded-lg hover:bg-red-700 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>


      {/* Main Content with Logo Background */}
      <main
        className="flex-1 bg-gray-50 p-6 overflow-y-auto relative"
        style={{
          backgroundImage: "url('/CSN logowopacity.png')", // same as admin
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center", // centered, moves as you scroll
          backgroundSize: "480px",
        }}
      >
        {/* Foreground content */}
        <div className="relative z-10">{children}</div>
      </main>
    </div>
  )
}
