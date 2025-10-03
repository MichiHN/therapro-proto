import React from "react"
import "./index.css"
import { Routes, Route, Navigate } from "react-router-dom"

// Login
import Login from "./pages/Login"

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard"
import Therapists from "./pages/admin/Therapists"
import Children from "./pages/admin/Children"

// Therapist
import TherapistDashboard from "./pages/therapist/TherapistDashboard"
import Activities from "./pages/therapist/Activities"
import Rewards from "./pages/therapist/Rewards"
import AssignedChildren from "./pages/therapist/AssignedChildren"

import PrivateRoute from "./components/PrivateRoute"

export default function App() {
  return (
      <Routes>
        {/* Login Route (public) */}
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/therapists"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Therapists />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/children"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Children />
            </PrivateRoute>
          }
        />

        {/* Therapist Routes */}
        <Route
          path="/therapist/dashboard"
          element={
            <PrivateRoute allowedRoles={["therapist"]}>
              <TherapistDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/therapist/activities"
          element={
            <PrivateRoute allowedRoles={["therapist"]}>
              <Activities />
            </PrivateRoute>
          }
        />
        <Route
          path="/therapist/rewards"
          element={
            <PrivateRoute allowedRoles={["therapist"]}>
              <Rewards />
            </PrivateRoute>
          }
        />
        <Route
          path="/therapist/assigned-children"
          element={
            <PrivateRoute allowedRoles={["therapist"]}>
              <AssignedChildren />
            </PrivateRoute>
          }
        />

        {/* Default Route -> Redirects to Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
  )
}
