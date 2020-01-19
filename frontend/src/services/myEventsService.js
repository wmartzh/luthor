import { API_ROUTES } from '../constants/apiRoutes'
import { axios } from '../plugins/axios'

export const myEventsService = async setData => {
  const request = await axios({
    method: API_ROUTES.getEvents.method,
    url: API_ROUTES.getEvents.url
  })
  if (request.status === 200) {
    setData(request.data.data)
  }
}
