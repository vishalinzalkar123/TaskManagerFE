import { createContext, useContext, useEffect, useState } from "react"

// 1. Create the context
const AuthContext = createContext()

// 2. Create provider component
export const VishalAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // 3. Load from localStorage on app start
  useEffect(() => {
    // Check for existing user session or token
    const token = localStorage.getItem("token")
    const email = localStorage.getItem("email")

    if (token && email) {
      setUser({ token, email })
    }
    setLoading(false)
  }, [])

  // 4. Login function
  const login = (data) => {
    const userData = {
      token: data.token,
      email: data.user.email,
    }
    setUser(userData)
    localStorage.setItem("token", data.token)
    localStorage.setItem("email", data.user.email)
  }

  // 5. Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("token")
    localStorage.removeItem("email")
  }

  // 6. Provide everything to children
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// 7. Create custom hook to access auth context
export const useAuth = () => useContext(AuthContext)
