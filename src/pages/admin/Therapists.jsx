import { useState } from "react"
import { motion } from "framer-motion"
import { UserPlus, Mail, Trash2, Eye, Users, UserCheck } from "lucide-react"
import SidebarLayout from "../../components/AdminSidebarLayout"

export default function Therapists() {
  const [therapists, setTherapists] = useState([
    { id: 1, name: "Karen Baker", email: "karen@therapro.test", children: [1], specialization: "Speech Therapy" },
    { id: 2, name: "Ryan Harris", email: "ryan@therapro.test", children: [2, 3], specialization: "Occupational Therapy" },
  ])

  // Example child list (in real app, fetch from backend or context)
  const childrenList = [
    { id: 1, name: "Ethan Patterson", age: 9, diagnosis: "ADHD" },
    { id: 2, name: "Zoe Kelly", age: 7, diagnosis: "Autism" },
    { id: 3, name: "Maya Owens", age: 10, diagnosis: "Autism" },
  ]

  const [showModal, setShowModal] = useState(false)
  const [assignModal, setAssignModal] = useState({ open: false, therapistId: null })
  const [newTherapist, setNewTherapist] = useState({ name: "", email: "", specialization: "" })

  const addTherapist = () => {
    if (newTherapist.name && newTherapist.email && newTherapist.specialization) {
      setTherapists([
        ...therapists,
        {
          id: Date.now(),
          name: newTherapist.name,
          email: newTherapist.email,
          specialization: newTherapist.specialization,
          children: [],
        },
      ])
      setNewTherapist({ name: "", email: "", specialization: "" })
      setShowModal(false)
    }
  }

  const removeTherapist = (id) => {
    setTherapists(therapists.filter((t) => t.id !== id))
  }

  const toggleChildAssignment = (therapistId, childId) => {
    setTherapists((prev) =>
      prev.map((t) => {
        if (t.id === therapistId) {
          const isAssigned = t.children.includes(childId)
          return {
            ...t,
            children: isAssigned
              ? t.children.filter((c) => c !== childId)
              : [...t.children, childId],
          }
        }
        return t
      })
    )
  }

  return (
    <SidebarLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Therapists</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            <UserPlus size={18} /> Add Therapist
          </button>
        </div>

        {/* Therapist List */}
        <div className="grid md:grid-cols-2 gap-4">
          {therapists.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white p-4 rounded-xl shadow flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">{t.name}</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setAssignModal({ open: true, therapistId: t.id })}
                    className="p-2 rounded hover:bg-gray-100 text-green-600"
                    title="Assign Children"
                  >
                    <UserCheck size={18} />
                  </button>
                  <button className="p-2 rounded hover:bg-gray-100" title="View Details">
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => removeTherapist(t.id)}
                    className="p-2 rounded hover:bg-red-100 text-red-600"
                    title="Remove Therapist"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="flex items-center text-gray-600 gap-2 text-sm">
                <Mail size={14} /> {t.email}
              </div>
              <div className="flex items-center text-gray-600 gap-2 text-sm">
                <Users size={14} /> Assigned Children: {t.children.length}
              </div>
              <p className="text-gray-500 text-sm">
                Specialization: <span className="font-medium">{t.specialization}</span>
              </p>
            </motion.div>
          ))}
        </div>

        {/* Add Therapist Modal */}
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex justify-center items-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-6 rounded-xl shadow-lg w-96"
            >
              <h2 className="text-lg font-bold mb-4">Add Therapist</h2>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={newTherapist.name}
                  onChange={(e) => setNewTherapist({ ...newTherapist, name: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newTherapist.email}
                  onChange={(e) => setNewTherapist({ ...newTherapist, email: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Specialization"
                  value={newTherapist.specialization}
                  onChange={(e) =>
                    setNewTherapist({ ...newTherapist, specialization: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addTherapist}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Assign Children Modal */}
        {assignModal.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex justify-center items-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-6 rounded-xl shadow-lg w-96"
            >
              <h2 className="text-lg font-bold mb-4">Assign Children</h2>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {childrenList.map((c) => {
                  const therapist = therapists.find((t) => t.id === assignModal.therapistId)
                  const isChecked = therapist?.children.includes(c.id)
                  return (
                    <label
                      key={c.id}
                      className="flex items-center gap-2 p-2 rounded hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleChildAssignment(assignModal.therapistId, c.id)}
                      />
                      <span>
                        {c.name} ({c.age} yrs) - {c.diagnosis}
                      </span>
                    </label>
                  )
                })}
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setAssignModal({ open: false, therapistId: null })}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </SidebarLayout>
  )
}
