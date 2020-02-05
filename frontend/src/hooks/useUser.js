import { useState, useEffect } from 'react'
import { getCurrentUser } from '../helpers/getCurrentLocalStorage'
import { statusService } from '../services/statusService'
import { axios } from '../plugins/axios'
import { devModeStatus, devModeCurrentToken } from '../helpers/devMode'

export const useUser = () => {
  const initialUser = () => getCurrentUser
  const localToken = localStorage.getItem('token')

  //? original
  // const [auth, setAuth] = useState(false)
  //? end

  //! dev mode! this method is on test
  const [auth, setAuth] = useState(devModeStatus)
  //! end

  const [user, setUser] = useState(initialUser)
  //? original
  // const [token, setToken] = useState(
  //   localToken ? JSON.parse(localToken).substr(1) : 'f34th3r.io'
  // )
  //? end

  //! dev mode! this method is on test
  const [token, setToken] = useState(
    devModeStatus
      ? devModeCurrentToken
      : localToken
      ? JSON.parse(localToken).substr(1)
      : 'f34th3r.io'
  )
  //! end

  //? original
  // useEffect(() => {
  //   if (auth) {
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(
  //       localToken
  //     ).substr(1)}`
  //   }
  // }, [auth, localToken])
  //? end

  //! dev mode! this method is on test
  useEffect(() => {
    if (auth) {
      devModeStatus
        ? (axios.defaults.headers.common['Authorization'] = `Bearer ${token}`)
        : (axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${JSON.parse(localToken).substr(1)}`)
    }
  }, [auth, localToken, token])
  //! end

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
