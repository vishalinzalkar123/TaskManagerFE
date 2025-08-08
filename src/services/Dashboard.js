import AxiosApi from "./AxiosAPI"

export const dashboardList = async () => {
  try {
    const response = await AxiosApi.get("/dashboard")
    return response.data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error)
    } else {
      throw new Error("Error while fetching projects")
    }
  }
}
