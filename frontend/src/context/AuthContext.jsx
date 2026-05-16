import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  async function login(formData) {
    try {
      const response = await api.post('/login', formData)

      localStorage.setItem('token', response.data.token)

      setUser(response.data.user)

      navigate('/dashboard')
    } catch (error) {
      console.error(error)
      alert('Credenciales incorrectas')
    }
  }

  async function register(formData) {
    try {
      const response = await api.post('/register', formData)

      localStorage.setItem('token', response.data.token)

      setUser(response.data.user)

      navigate('/dashboard')
    } catch (error) {
      console.error(error)
      alert('Error al registrar usuario')
    }
  }

  async function logout() {
    try {
      await api.post('/logout')

      localStorage.removeItem('token')

      setUser(null)

      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}