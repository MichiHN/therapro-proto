import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { User, Lock } from "lucide-react"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  // Dummy accs
  const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "therapist", password: "therapist123", role: "therapist" },
  ]

  const handleLogin = (e) => {
    e.preventDefault()

    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    )

    if (!foundUser) {
      setError("Invalid credentials")
      return
    }

    localStorage.setItem("user", JSON.stringify({ role: foundUser.role }))

    if (foundUser.role === "admin") {
      navigate("/admin/dashboard")
    } else if (foundUser.role === "therapist") {
      navigate("/therapist/dashboard")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-200 via-green-300 to-green-400">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-2xl shadow-2xl w-96 space-y-6"
      >
        <h1 className="text-3xl font-extrabold text-center text-gray-800">
          Welcome Back 👋
        </h1>
        <p className="text-center text-gray-500 text-sm">
          Please login to continue
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {/* Username Input */}
        <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-green-400">
          <User className="text-gray-400 w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full outline-none"
          />
        </div>

        {/* Password Input */}
        <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-green-400">
          <Lock className="text-gray-400 w-5 h-5 mr-2" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full outline-none"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition transform hover:scale-105"
        >
          Login
        </button>

        {/* Demo Credentials */}
        <div className="bg-gray-50 border p-3 rounded-lg text-sm text-gray-600">
          <p className="font-semibold text-gray-700 mb-1">Demo Accounts:</p>
          <p>👑 Admin → <b>admin / admin123</b></p>
          <p>🧑‍⚕️ Therapist → <b>therapist / therapist123</b></p>
        </div>
      </form>
    </div>
  )
}
