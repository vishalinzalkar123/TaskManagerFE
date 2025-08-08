import AxiosApi from "./AxiosAPI"

export const registerUser = async (form) => {
  const { fullName, email, password } = form
  const params = {
    user: {
      name: fullName,
      email: email,
      password: password,
    },
  }
  try {
    const response = await AxiosApi.post("/sign_up", params)
    return response.data
  } catch (error) {
    if (error.response && error.response.data?.errors) {
      // Handle specific error messages from the server
      throw new Error(error.response.data.errors[0])
    } else {
      // Handle general network or server errors
      throw new Error("Registration failed:", error.message)
    }
  }
}

export const loginUser = async (form) => {
  const { email, password } = form
  const params = {
    user: {
      email: email,
      password: password,
    },
  }
  try {
    const response = await AxiosApi.post("/login", params)
    return response.data
  } catch (error) {
    if (error.response && error.response.data) {
      // Handle specific error messages from the server
      throw new Error(error.response.data.error)
    } else {
      // Handle general network or server errors
      throw new Error("Login failed:", error.message)
    }
  }
}
