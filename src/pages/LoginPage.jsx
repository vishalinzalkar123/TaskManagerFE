import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { loginUser } from "../services/AuthService"

const RegistrationPage = () => {
  // step: 2
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  // step: 8
  const [error, setError] = useState(null)
  // step: 6
  const navigate = useNavigate()
  // step: 7
  const { login } = useAuth() // context function to set user + token

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
      // Call the login service
      const data = await loginUser(form) // from service
      console.log("Login data:", data)
      if (data && data.token) {
        login(data) // from context
        navigate("/dashboard")
      } else {
        setError("Login failed. Please try again.")
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.")
    }
  }

  return (
    // step: 1
    <div className="container" style={{ maxWidth: "500px" }}>
      {error && <div className="alert alert-danger">{error}</div>}

      <h2 className="mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
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
          Login
        </button>
      </form>
    </div>
  )
}

export default RegistrationPage
