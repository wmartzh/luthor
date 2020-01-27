import { axios } from '../plugins/axios'

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
      url: url
    })
    if (request.status === 200) {
      setData(request.data.data)
    }
  } catch (error) {
    setError(error)
  }
  setLoading(false)
}
