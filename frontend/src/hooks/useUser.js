import { useState } from 'react'
import {
  getCurrentToken,
  getCurrentUser
} from '../helpers/getCurrentLocalStorage'
// import axios from 'axios'

export const useUser = () => {
  const initialUser = () => getCurrentUser
  const initialToken = () => getCurrentToken

  const [user, setUser] = useState(initialUser)
  const [token, setToken] = useState(initialToken)

  return {
    user,
    setUser,
    token,
    setToken
  }
}
