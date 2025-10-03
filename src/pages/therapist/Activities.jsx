// src/pages/therapist/Activities.jsx
import { useState } from "react"
import TherapistSidebarLayout from "../../components/TherapistSidebarLayout"

export default function Activities() {
  const [selectedGame, setSelectedGame] = useState(null)
  const [selectedStudent, setSelectedStudent] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [activeGame, setActiveGame] = useState(null) // for iframe mode

  // Example student list (later fetch from DB)
  const students = [
    "Zoe Kelly",
    "Maya Owens",
  ]

  // Example games (each has link to its .html file)
  const games = [
    {
      title: "Sort Laundry Game",
      description: "Teach children sorting and organizing skills with laundry.",
      image:
        "https://storage.googleapis.com/a1aa/image/7da0d7ab-f2ab-451d-59ba-3a390d3e2af9.jpg",
      link: "/games/Sort%20laundry.html",
    },
    {
      title: "Wash Hands Game",
      description: "Help children learn proper handwashing techniques.",
      image:
        "https://storage.googleapis.com/a1aa/image/4d47f295-36bf-468c-12b3-b0ab982ab02c.jpg",
      link: "/games/Wash%20hands(upd1).html",
    },
  ]

  const handlePlay = (game) => {
    setSelectedGame(game)
    setShowModal(true)
  }

  const handleStartGame = () => {
    if (selectedGame && selectedStudent) {
      setActiveGame(selectedGame) // load game into iframe
      setShowModal(false) // close modal
    }
  }

  const handleExitGame = () => {
    setActiveGame(null) // clear game
    setSelectedStudent("") // reset student
  }

  return (
    <TherapistSidebarLayout>
      <div className="p-6">
        {!activeGame ? (
          <>
            <h1 className="text-2xl font-bold mb-6">Choose an Activity</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {games.map((game, idx) => (
                <div
                  key={idx}
                  className="bg-green-50 rounded-xl shadow hover:shadow-lg p-6 flex flex-col items-center text-center"
                >
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-28 h-28 object-contain mb-4"
                  />
                  <h2 className="text-lg font-semibold mb-2">{game.title}</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    {game.description}
                  </p>
                  <button
                    onClick={() => handlePlay(game)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Play
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Playing: {activeGame.title} (Student: {selectedStudent})
              </h2>
              <button
                onClick={handleExitGame}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Exit Game
              </button>
            </div>
            <div className="w-full h-[600px] border rounded-lg overflow-hidden">
              <iframe
                src={activeGame.link}
                title={activeGame.title}
                className="w-full h-full"
              />
            </div>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 w-96">
              <h2 className="text-lg font-semibold mb-4">Select a Student</h2>
              <div className="space-y-2 max-h-40 overflow-y-auto border rounded p-2">
                {students.map((student, i) => (
                  <label
                    key={i}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="student"
                      value={student}
                      checked={selectedStudent === student}
                      onChange={(e) => setSelectedStudent(e.target.value)}
                    />
                    <span>{student}</span>
                  </label>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStartGame}
                  disabled={!selectedStudent}
                  className={`px-4 py-2 rounded text-white ${
                    selectedStudent
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Start Game
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </TherapistSidebarLayout>
  )
}
