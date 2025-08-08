import { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import { projectTasks } from "../services/TaskService"

const ProjectTasksList = () => {
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const location = useLocation()
  const { project_id } = useParams()

  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage)
    }
  }, [location.state])

  useEffect(() => {
    const fetchTasks = async (project_id) => {
      try {
        // Call the allProjects service
        const data = await projectTasks(project_id) // from service
        console.log("Tasks data:", data)

        if (data) {
          // from context
          setTasks(data)
        } else {
          setError("Unable to fetch Tasks")
        }
      } catch (err) {
        setError(err.message || "Unable to fetch Tasks")
      }
    }
    fetchTasks({ project_id })
  }, [])

  const confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      console.log("Delete task", id)
    }
  }

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="h3">Tasks for {project_id}</h1>
        <div>
          <Link
            className="btn btn-primary"
            to={`/projects/${project_id}/tasks/new`}
          >
            New Task
          </Link>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}

      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Project ID</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody id="projects-table-body">
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>
                  <span className="truncate" title="Full description here">
                    {task.description}
                  </span>
                </td>
                <td>
                  <small className="text-muted">{task.due_date}</small>
                </td>
                <td>
                  <small className="text-muted">{task.project_id}</small>
                </td>
                <td>
                  <span className="badge bg-success">{task.status}</span>
                </td>

                <td className="text-end actions">
                  <a
                    href="/tasks/1"
                    className="btn btn-sm btn-outline-secondary"
                  >
                    View
                  </a>
                  <a
                    href="/tasks/1/edit"
                    className="btn btn-sm btn-outline-primary"
                  >
                    Edit
                  </a>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => confirmDelete(1)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav aria-label="Projects pagination" className="mt-3">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link">Previous</a>
          </li>
          <li className="page-item active">
            <a className="page-link">1</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="?page=2">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="?page=3">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="?page=2">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default ProjectTasksList
