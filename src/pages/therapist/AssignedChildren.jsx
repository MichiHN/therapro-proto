import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, Calendar, User, Activity, X } from "lucide-react"
import TherapistSidebarLayout from "../../components/TherapistSidebarLayout"

export default function AssignedChildren() {
  // Example assigned children
  const assigned = [
    { id: 1, name: "Zoe Kelly", age: 7, diagnosis: "Autism", progress: "70%", notes: "Doing well in memory activities." },
    { id: 2, name: "Maya Owens", age: 10, diagnosis: "Autism", progress: "45%", notes: "Needs more support in categorization." },
  ]

  const [selectedChild, setSelectedChild] = useState(null)

  return (
    <TherapistSidebarLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Assigned Children</h1>
          <p className="text-gray-500 text-sm">
            These are the children currently assigned to you.
          </p>
        </div>

        {/* Assigned Children List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assigned.map((child) => (
            <motion.div
              key={child.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white p-4 rounded-xl shadow flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">{child.name}</h2>
                <button
                  onClick={() => setSelectedChild(child)}
                  className="p-2 rounded hover:bg-gray-100"
                  title="View Details"
                >
                  <Eye size={18} />
                </button>
              </div>
              <div className="flex items-center text-gray-600 gap-2 text-sm">
                <Calendar size={14} /> Age: {child.age}
              </div>
              <div className="flex items-center text-gray-600 gap-2 text-sm">
                <User size={14} /> Diagnosis: {child.diagnosis}
              </div>
              <div className="flex items-center text-gray-600 gap-2 text-sm">
                <Activity size={14} /> Progress: {child.progress}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View Child Modal */}
        {selectedChild && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-6 rounded-xl shadow-lg w-96 relative"
            >
              <button
                onClick={() => setSelectedChild(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
              <h2 className="text-xl font-bold mb-4">{selectedChild.name}</h2>
              <p className="text-gray-700"><strong>Age:</strong> {selectedChild.age}</p>
              <p className="text-gray-700"><strong>Diagnosis:</strong> {selectedChild.diagnosis}</p>
              <p className="text-gray-700"><strong>Progress:</strong> {selectedChild.progress}</p>
              <p className="text-gray-700"><strong>Notes:</strong> {selectedChild.notes}</p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </TherapistSidebarLayout>
  )
}
