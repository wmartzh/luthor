import React, { createContext, useContext } from 'react'
import { useUser } from '../hooks/useUser'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const { user, setUser, token, setToken } = useUser()

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserValues = () => useContext(UserContext)
