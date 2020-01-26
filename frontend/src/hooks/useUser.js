import { useState, useEffect } from 'react'
import { getCurrentUser } from '../helpers/getCurrentLocalStorage'
import { statusService } from '../services/statusService'
import { axios } from '../plugins/axios'

export const useUser = () => {
  const initialUser = () => getCurrentUser
  const localToken = localStorage.getItem('token')

  const [user, setUser] = useState(initialUser)
  const [token, setToken] = useState('f34th3r.io')

  useEffect(() => {
    if (localToken !== null) {
      const temToken = localToken ? JSON.parse(localToken).substr(1) : ''
      setToken(temToken)
      // axios.defaults.headers.common = { Authorization: `Bearer ${temToken}` } // TODO!!! future update
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
    setToken
  }
}
