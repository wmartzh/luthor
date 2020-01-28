import React, { createContext, useContext } from 'react'
import { useUser } from '../hooks/useUser'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const { user, setUser, token, setToken, auth, setAuth } = useUser()

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        auth,
        setAuth
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserValues = () => useContext(UserContext)
