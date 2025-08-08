import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { allProjects } from "../services/ProjectService"

const ProjectsList = () => {
  const [projects, setProjects] = useState([])
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const location = useLocation()

  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage)
    }
  }, [location.state])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Call the allProjects service
        const data = await allProjects() // from service
        console.log("Projects data:", data)

        if (data) {
          // from context
          setProjects(data)
        } else {
          setError("Unable to fetch Products")
        }
      } catch (err) {
        setError(err.message || "Unable to fetch Products")
      }
    }
    fetchProjects()
  }, [])

  const confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      console.log("Delete project", id)
    }
  }

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="h3">Projects</h1>
        <div>
          <Link className="btn btn-primary" to="/projects/new">
            New Project
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
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody id="projects-table-body">
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.title}</td>
                <td>
                  <span className="truncate" title="Full description here">
                    {project.description}
                  </span>
                </td>
                <td>
                  <small className="text-muted">{project.start_date}</small>
                </td>
                <td>
                  <small className="text-muted">{project.end_date}</small>
                </td>
                <td>
                  <span className="badge bg-success">{project.status}</span>
                </td>

                <td className="text-end actions">
                  <Link
                    className="btn btn-sm btn-outline-secondary"
                    to={`/projects/${project.id}/tasks`}
                  >
                    View All Tasks
                  </Link>

                  <a
                    href="/projects/1/edit"
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

export default ProjectsList
