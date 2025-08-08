import { useEffect, useState } from "react"
import { dashboardList } from "../services/Dashboard"

const Dashboard = () => {
  const [counts, setCounts] = useState({
    users: 0,
    projects: 0,
    tasks: 0,
    comments: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await dashboardList()
        if (data) {
          setCounts({
            users: data.users_count,
            projects: data.projects_count,
            tasks: data.tasks_count,
            comments: data.comments_count,
          })
        } else {
          setError("Unable to fetch dashboard data")
        }
      } catch (err) {
        setError(err.message || "Unable to fetch dashboard data")
      } finally {
        setLoading(false)
      }
    }
    fetchDashboardData()
  }, [])

  if (loading) {
    return <div className="text-center mt-5">Loading dashboard...</div>
  }

  if (error) {
    return <div className="alert alert-danger mt-4">{error}</div>
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Dashboard</h1>
      <div className="row g-4">
        <div className="col-md-3">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5 className="card-title">Users</h5>
              <h2 className="fw-bold text-primary">{counts.users}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5 className="card-title">Projects</h5>
              <h2 className="fw-bold text-success">{counts.projects}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5 className="card-title">Tasks</h5>
              <h2 className="fw-bold text-warning">{counts.tasks}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5 className="card-title">Comments</h5>
              <h2 className="fw-bold text-danger">{counts.comments}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
