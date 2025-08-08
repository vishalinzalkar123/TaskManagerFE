import AxiosApi from "./AxiosAPI"

export const allTasks = async () => {
  try {
    const response = await AxiosApi.get("/tasks")
    return response.data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error)
    } else {
      throw new Error("Error while fetching tasks")
    }
  }
}

export const projectTasks = async (data) => {
  const project_id = data.project_id
  try {
    const response = await AxiosApi.get(`projects/${project_id}/tasks`)
    return response.data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error)
    } else {
      throw new Error("Error while fetching project tasks")
    }
  }
}

export const createProjectTask = async (data, project_id) => {
  const params = {
    task: {
      title: data.title,
      description: data.description,
      due_date: data.due_date,
      status: data.status,
    },
  }

  try {
    const response = await AxiosApi.post(
      `/projects/${project_id}/tasks`,
      params
    )
    return response.data
  } catch (error) {
    if (error.response && error.response.data?.errors) {
      throw new Error(error.response.data.errors[0])
    } else {
      throw new Error("Error while fetching projects")
    }
  }
}

export const createTask = async (data) => {
  const params = {
    task: {
      title: data.title,
      description: data.description,
      due_date: data.due_date,
      project_id: data.project_id,
      status: data.status,
    },
  }

  try {
    const response = await AxiosApi.post("/tasks", params)
    return response.data
  } catch (error) {
    if (error.response && error.response.data?.errors) {
      throw new Error(error.response.data.errors[0])
    } else {
      throw new Error("Error while fetching projects")
    }
  }
}
