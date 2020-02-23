import { useUserValues } from '../context/UserContext'
import { API_ROUTES } from '../constants/apiRoutes'
import { axios } from '../plugins/axios'

export const statusService = async setUser => {
  const request = await axios({
    method: API_ROUTES.getStatus.method,
    url: API_ROUTES.getStatus.url
  })
  if (request.status === 200) {
    setUser(prev => ({
      ...prev,
      status: request.data.status
    }))
  }
}
