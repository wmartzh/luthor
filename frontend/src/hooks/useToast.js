import { useState, useEffect } from 'react'

export const useToast = () => {
  const [toastDisplay, setToastDisplay] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastStatus, setToastStatus] = useState('')
  const [toastTime, setToastTime] = useState(6000)
  const [toastSize, setToastSize] = useState(200)

  useEffect(() => {
    if (!toastDisplay) setToastMessage('')
    return () => {
      setToastMessage('')
    }
  }, [toastDisplay])

  useEffect(() => {
    if (toastDisplay) {
      setInterval(() => {
        setToastDisplay(false)
      }, toastTime)
    }
    return () => {
      setToastTime(6000)
    }
  }, [toastDisplay, toastTime])

  return {
    toastDisplay,
    setToastDisplay,
    toastMessage,
    setToastMessage,
    toastStatus,
    setToastStatus,
    setToastTime,
    toastSize,
    setToastSize
  }
}
