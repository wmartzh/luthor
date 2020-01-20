import { useState, useEffect } from 'react'
import {
  getCurrentToken,
  getCurrentUser
} from '../helpers/getCurrentLocalStorage'
import { statusService } from '../services/statusService'

export const useUser = () => {
  const initialUser = () => getCurrentUser
  const initialToken = () => getCurrentToken

  const [user, setUser] = useState(initialUser)
  const [token, setToken] = useState(initialToken)

  useEffect(() => {
    if (user.role === '2' && user.role === '3') {
      statusService(setUser)
    }
  }, [user.role])

  useEffect(() => {
    if (user.role === '2' && user.role === '3') {
      setInterval(() => {
        statusService(setUser)
      }, 180000) // 3 min
    }
  }, [user.role])

  return {
    user,
    setUser,
    token,
    setToken
  }
}
