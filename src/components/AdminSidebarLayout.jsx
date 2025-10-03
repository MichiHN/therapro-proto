import { useState } from "react"
import { Link } from "react-router-dom"
import { LayoutDashboard, Users, Baby, Plus, Menu, LogOut } from "lucide-react"

export default function SidebarLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showTherapistModal, setShowTherapistModal] = useState(false)
  const handleLogout = () => {
  localStorage.removeItem("user")
  window.location.href = "/login"
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
          to="/admin/dashboard"
          className="flex items-center gap-3 hover:text-green-500 transition text-lg"
        >
          <LayoutDashboard size={24} />
          <span className={`${sidebarOpen ? "" : "hidden"}`}>Dashboard</span>
        </Link>

        <Link
          to="/admin/therapists"
          className="flex items-center gap-3 hover:text-green-500 transition text-lg"
        >
          <Users size={24} />
          <span className={`${sidebarOpen ? "" : "hidden"}`}>Therapists</span>
        </Link>

        <Link
          to="/admin/children"
          className="flex items-center gap-3 hover:text-green-500 transition text-lg"
        >
          <Baby size={24} />
          <span className={`${sidebarOpen ? "" : "hidden"}`}>Children</span>
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

      <main
  className="flex-1 bg-gray-50 p-6 overflow-y-auto relative"
  style={{
    backgroundImage: "url('/CSN logowopacity.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center", // stays at the top and moves with scroll
    backgroundSize: "480px",
    
  }}
>
  {/* Foreground content */}
  <div className="relative z-10">{children}</div>
</main>


    </div>
  )
}
