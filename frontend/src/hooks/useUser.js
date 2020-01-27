import { useState, useEffect } from 'react'
import { getCurrentUser } from '../helpers/getCurrentLocalStorage'
import { statusService } from '../services/statusService'
import { axios } from '../plugins/axios'

export const useUser = () => {
  const initialUser = () => getCurrentUser
  const localToken = localStorage.getItem('token')

  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState(initialUser)
  const [token, setToken] = useState(
    localToken ? JSON.parse(localToken).substr(1) : 'f34th3r.io'
  )

  useEffect(() => {
    if (auth) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(
        localToken
      ).substr(1)}`
    }
  }, [auth, localToken])

  useEffect(() => {
    if (localToken !== null) {
      setToken(localToken ? JSON.parse(localToken).substr(1) : '')
    }
  }, [localToken])

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
    setToken,
    auth,
    setAuth
  }
}
