import React, { useState } from "react" // Your API service
import { createProject } from "../services/ProjectService"
import { useNavigate } from "react-router-dom"

const ProjectCreateForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    status: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  // const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    // setSuccess("")

    try {
      const response = await createProject(form)
      if (response && response.title) {
        // setSuccess(`Project "${response.title}" created successfully!`)
        setForm({
          title: "",
          description: "",
          start_date: "",
          end_date: "",
          status: 0,
        })
        navigate("/projects", {
          state: {
            successMessage: `Project "${response.title}" created successfully!`,
          },
        })
      } else {
        setError("Unexpected response from server")
      }
    } catch (err) {
      setError(err.message || "Failed to create project")
    }
    setLoading(false)
  }

  return (
    <div className="container mt-2" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Create New Project</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Project Name */}
          <div className="mb-3 col-md-6">
            <label className="form-label">Project Name</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Status */}
          <div className="mb-3 col-md-6">
            <label className="form-label">Status</label>
            <input
              type="text"
              className="form-control"
              name="status"
              value={form.status}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Start Date */}
        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
            />
          </div>

          {/* End Date */}
          <div className="mb-3 mb-3 col-md-6">
            <label className="form-label">End Date</label>
            <input
              type="date"
              className="form-control"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  )
}

export default ProjectCreateForm
