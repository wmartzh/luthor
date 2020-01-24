import { API_ROUTES } from '../constants/apiRoutes'
import { axios } from '../plugins/axios'

export const requestService = async (
  method,
  url,
  data = null,
  setData,
  setLoading
) => {
  setLoading(true)
  const request = await axios({
    method: method,
    url: url,
    data: data
  })
  if (request.status === 200) {
    setData(request.data.data)
  }
  setLoading(false)
}
