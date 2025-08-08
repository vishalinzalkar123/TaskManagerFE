import React, { useState } from "react" // Your API service
import { useNavigate, useParams } from "react-router-dom"
import { createProjectTask } from "../services/TaskService"

const ProjectTaskCreateForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  // const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  const { project_id } = useParams()

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
      const response = await createProjectTask(form, project_id)
      if (response && response.title) {
        // setSuccess(`Project "${response.title}" created successfully!`)
        setForm({
          title: "",
          description: "",
          due_date: "",
          status: 0,
        })
        navigate(`/projects/${project_id}/tasks`, {
          state: {
            successMessage: `Task "${response.title}" created successfully!`,
          },
        })
      } else {
        setError("Unexpected response from server")
      }
    } catch (err) {
      setError(err.message || "Failed to create task")
    }
    setLoading(false)
  }

  return (
    <div className="container mt-2" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Create Task for {project_id}</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="form-label">Task Name</label>
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
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="form-control"
              name="due_date"
              value={form.due_date}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="mb-3 col-md-6">
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
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  )
}

export default ProjectTaskCreateForm
