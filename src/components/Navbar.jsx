// components/Navbar.js

import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
export default function Navbar() {
  const { user, logout, loading } = useAuth() // Access user from context
  console.log("NAVBAR USER:", user)
  console.log("NAVBAR LOADING:", loading)

  if (loading) return <div>Loading...</div> // Show loading state if needed

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard">
          MyApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            {user ? (
              <>
                <li className="nav-item d-flex align-items-center">
                  <span className="nav-link">{user.email}</span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
