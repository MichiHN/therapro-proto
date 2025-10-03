import { useState } from "react"
import { motion } from "framer-motion"
import { UserPlus, Trash2, Eye, Calendar, User, Stethoscope } from "lucide-react"
import SidebarLayout from "../../components/AdminSidebarLayout"

export default function Children() {
  const [children, setChildren] = useState([
    { id: 1, name: "Zoe Kelly", age: 7, diagnosis: "Autism", therapist: "Ryan Harris" },
    { id: 2, name: "Maya Owens", age: 10, diagnosis: "Autism", therapist: "Ryan Harris" },
    { id: 3, name: "Ethan Patterson", age: 9, diagnosis: "ADHD", therapist: "Karen Baker" },
  ])

  const [showModal, setShowModal] = useState(false)
  const [newChild, setNewChild] = useState({ name: "", age: "", diagnosis: "", therapist: "" })
  const [selectedChild, setSelectedChild] = useState(null)

  const addChild = () => {
    if (newChild.name && newChild.age && newChild.diagnosis && newChild.therapist) {
      setChildren([
        ...children,
        {
          id: Date.now(),
          name: newChild.name,
          age: newChild.age,
          diagnosis: newChild.diagnosis,
          therapist: newChild.therapist,
        },
      ])
      setNewChild({ name: "", age: "", diagnosis: "", therapist: "" })
      setShowModal(false)
    }
  }

  const removeChild = (id) => {
    setChildren(children.filter((c) => c.id !== id))
  }

  return (
    <SidebarLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Children</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            <UserPlus size={18} /> Add Child
          </button>
        </div>

        {/* Children List */}
        <div className="grid md:grid-cols-2 gap-4">
          {children.map((c) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white p-4 rounded-xl shadow flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">{c.name}</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedChild(c)}
                    className="p-2 rounded hover:bg-gray-100"
                    title="View Details"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => removeChild(c.id)}
                    className="p-2 rounded hover:bg-red-100 text-red-600"
                    title="Remove Child"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="flex items-center text-gray-600 gap-2 text-sm">
                <Calendar size={14} /> Age: {c.age}
              </div>
              <div className="flex items-center text-gray-600 gap-2 text-sm">
                <User size={14} /> Diagnosis: {c.diagnosis}
              </div>
              <div className="flex items-center text-gray-600 gap-2 text-sm">
                <Stethoscope size={14} /> Therapist: {c.therapist}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Child Modal */}
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
              <h2 className="text-lg font-bold mb-4">Add Child</h2>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={newChild.name}
                  onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Age"
                  value={newChild.age}
                  onChange={(e) => setNewChild({ ...newChild, age: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Diagnosis"
                  value={newChild.diagnosis}
                  onChange={(e) => setNewChild({ ...newChild, diagnosis: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Assigned Therapist"
                  value={newChild.therapist}
                  onChange={(e) => setNewChild({ ...newChild, therapist: e.target.value })}
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
                    onClick={addChild}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* View Child Modal */}
        {selectedChild && (
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
              <h2 className="text-lg font-bold mb-4">{selectedChild.name} - Details</h2>
              <p><strong>Age:</strong> {selectedChild.age}</p>
              <p><strong>Diagnosis:</strong> {selectedChild.diagnosis}</p>
              <p><strong>Assigned Therapist:</strong> {selectedChild.therapist}</p>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setSelectedChild(null)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
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
