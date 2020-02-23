import React, { createContext, useContext } from 'react'
import { useToast } from '../hooks/useToast'

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
  const {
    toastDisplay,
    setToastDisplay,
    toastMessage,
    setToastMessage,
    toastStatus,
    setToastStatus,
    setToastTime,
    toastSize,
    setToastSize
  } = useToast()
  return (
    <ToastContext.Provider
      value={{
        toastDisplay,
        setToastDisplay,
        toastMessage,
        setToastMessage,
        toastStatus,
        setToastStatus,
        setToastTime,
        toastSize,
        setToastSize
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}

export const useToastValues = () => useContext(ToastContext)
