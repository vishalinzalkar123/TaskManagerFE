import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { registerUser } from "../services/AuthService"

const RegistrationPage = () => {
  // step: 2
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  })
  // step: 8
  const [error, setError] = useState(null)
  // step: 6
  const navigate = useNavigate()
  // step: 7
  const { login } = useAuth() // from context

  // step: 3
  const handleformChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  // step: 4
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    // Need context here
    // step: 5
    try {
      const data = await registerUser(form) //from service
      console.log("Registration data:", data)
      if (data && data.token) {
        login(data) //from context
        navigate("/dashboard")
      } else {
        setError("Registration failed. Please try again.")
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.")
    }
  }

  return (
    // step: 1
    <div className="container" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Register</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3 w-100 mx-auto">
          <label className="form-label">
            <strong>Full Name</strong>
          </label>
          <input
            placeholder="Enter your full name"
            name="fullName"
            value={form.fullName}
            type="text"
            className="form-control"
            onChange={handleformChange}
            required
          />
        </div>

        <div className="mb-3 w-100 mx-auto">
          <label className="form-label">
            <strong>Email address</strong>
          </label>
          <input
            placeholder="Enter your email"
            name="email"
            value={form.email}
            type="email"
            className="form-control"
            onChange={handleformChange}
            required
          />
        </div>

        <div className="mb-3 w-100 mx-auto">
          <label className="form-label">
            <strong>Password</strong>
          </label>
          <input
            placeholder="Enter your password"
            name="password"
            value={form.password}
            type="password"
            className="form-control"
            onChange={handleformChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default RegistrationPage
