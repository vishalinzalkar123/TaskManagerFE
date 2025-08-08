import "./App.css"
import Navbar from "./components/Navbar"
import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegistrationPage from "./pages/RegistrationPage"
import Dashboard from "./pages/Dashboard"
import ProjectsList from "./pages/ProjectsList"
import TasksList from "./pages/TasksList"
import ProjectCreateForm from "./pages/ProjectCreateForm"
import ProjectTasksList from "./pages/ProjectTasksList"
import ProjectTaskCreateForm from "./pages/ProjectTaskCreateForm"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegistrationPage />}></Route>
        <Route path="/projects" element={<ProjectsList />}></Route>
        <Route path="/tasks" element={<TasksList />}></Route>
        <Route path="/projects/new" element={<ProjectCreateForm />}></Route>
        <Route
          path="/projects/:project_id/tasks"
          element={<ProjectTasksList />}
        ></Route>
        <Route
          path="/projects/:project_id/tasks/new"
          element={<ProjectTaskCreateForm />}
        ></Route>
      </Routes>
    </>
  )
}

export default App
