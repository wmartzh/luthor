import { axios } from '../plugins/axios'
import { getCurrentToken } from '../helpers/getCurrentLocalStorage'

export const requestService = async (
  method,
  url,
  setData,
  setLoading,
  setError
) => {
  try {
    setLoading(true)
    const request = await axios({
      method: method,
      url: url,
      headers: {
        Authorization: `Bearer ${getCurrentToken}`
      }
    })
    if (request.status === 200) {
      setData(request.data.data)
    }
  } catch (error) {
    setError(error)
  }
  setLoading(false)
}
