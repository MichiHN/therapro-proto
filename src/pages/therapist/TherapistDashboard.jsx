// src/pages/therapist/TherapistDashboard.jsx
import { motion } from "framer-motion"
import TherapistSidebarLayout from "../../components/TherapistSidebarLayout"
import { Calendar, Clock, Gift, User } from "lucide-react"

export default function TherapistDashboard() {
  // Example data (later you can fetch from backend)
  const assignedChildren = [
    { id: 1, name: "Zoe Kelly", age: 7, diagnosis: "Autism", lastActivity: "Handwashing Game" },
    { id: 2, name: "Maya Owens", age: 10, diagnosis: "Autism", lastActivity: "Laundry Sort" },
  ]

  const todaySessions = [
    { time: "09:00 AM", child: "Zoe Kelly", activity: "Speech Therapy" },
    { time: "11:00 AM", child: "Maya Owens", activity: "Occupational Therapy" },
  ]

  return (
    <TherapistSidebarLayout>
      <div className="space-y-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-400 to-blue-400 text-white p-6 rounded-2xl shadow"
        >
          <h1 className="text-2xl font-bold">👋 Welcome back, Dr. Harris!</h1>
          <p className="text-sm mt-1">Here’s what’s happening today.</p>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Assigned Children */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-xl shadow flex flex-col"
          >
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <User size={18} /> Assigned Children
            </h2>
            <div className="space-y-3">
              {assignedChildren.map((child) => (
                <div
                  key={child.id}
                  className="p-3 rounded-lg border hover:bg-gray-50 transition"
                >
                  <p className="font-medium">{child.name} ({child.age} y/o)</p>
                  <p className="text-sm text-gray-500">Diagnosis: {child.diagnosis}</p>
                  <p className="text-xs text-gray-400">Last Activity: {child.lastActivity}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Today’s Sessions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-xl shadow flex flex-col"
          >
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Calendar size={18} /> Today’s Sessions
            </h2>
            <div className="space-y-3">
              {todaySessions.map((session, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 transition"
                >
                  <div>
                    <p className="font-medium">{session.child}</p>
                    <p className="text-xs text-gray-500">{session.activity}</p>
                  </div>
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <Clock size={14} /> {session.time}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Rewards Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-xl shadow flex flex-col"
          >
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Gift size={18} /> Rewards Overview
            </h2>
            <div className="space-y-2">
              <p className="text-sm">Zoe Kelly: ⭐ 5 Stars</p>
              <p className="text-sm">Maya Owens: ⭐ 3 Stars</p>
            </div>
            <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Manage Rewards
            </button>
          </motion.div>
        </div>
      </div>
    </TherapistSidebarLayout>
  )
}
