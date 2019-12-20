import React, { createContext, useContext } from 'react'
import { useUser } from '../hooks/useUser'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const { user, setUser } = useUser()

  return (
    <UserContext.Provider value={(user, setUser)}>
      {children}
    </UserContext.Provider>
  )
}

export const usePostValues = () => useContext(UserContext)
