import { Navigate } from "react-router-dom"

export default function PrivateRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user")) // Example: { role: "admin" }

  if (!user) {
    return <Navigate to="/login" replace /> // not logged in
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace /> // logged in but wrong role
  }

  return children
}
