import AxiosApi from "./AxiosAPI"

export const allProjects = async () => {
  try {
    const response = await AxiosApi.get("/projects")
    return response.data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error)
    } else {
      throw new Error("Error while fetching projects")
    }
  }
}

export const createProject = async (data) => {
  const params = {
    project: {
      title: data.title,
      description: data.description,
      start_date: data.start_date,
      end_date: data.end_date,
      status: data.status,
    },
  }

  try {
    const response = await AxiosApi.post("/projects", params)
    return response.data
  } catch (error) {
    if (error.response && error.response.data?.errors) {
      throw new Error(error.response.data.errors[0])
    } else {
      throw new Error("Error while fetching projects")
    }
  }
}
