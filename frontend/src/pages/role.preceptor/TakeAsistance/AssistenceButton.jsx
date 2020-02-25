import React, { useState, useEffect } from 'react'
import { ButtonComponent } from '../../../components/ButtonComponent'
import { API_ROUTES } from '../../../constants/apiRoutes'
import { axios } from '../../../plugins/axios'

export const AssistanceButton = ({ code, event }) => {
  const [sended, setSended] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {}, [])

  const submitHandler = async () => {
    setLoading(true)
    try {
      const request = await axios({
        method: API_ROUTES.checkAssistance.method,
        url: API_ROUTES.checkAssistance.url,
        data: { user_code: code, event_id: event }
      })
      setSended(true)
    } catch (err) {
      const {
        data: { message },
        status
      } = err.response
      setError(true)
    }
    setLoading(false)
  }
  return (
    <ButtonComponent
      background="#12B6C6"
      width="100px"
      height="40px"
      margin="0"
      disable={sended}
      click={submitHandler}
    >
      {loading ? '...' : !sended ? 'Validate' : error ? 'Error' : ' Valid'}
    </ButtonComponent>
  )
}
