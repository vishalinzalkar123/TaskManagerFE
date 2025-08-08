import axios from "axios"

const AxiosApi = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
})

AxiosApi.interceptors.request.use((config) => {
  // You can add any request interceptors here
  const token = localStorage.getItem("token")
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`
  }
  return config
})

export default AxiosApi
