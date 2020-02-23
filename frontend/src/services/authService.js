import { API_ROUTES } from '../constants/apiRoutes'
import { axios } from '../plugins/axios'

export const logoutService = async (history, setError) => {
  try {
    await axios({
      method: API_ROUTES.logout.method,
      url: API_ROUTES.logout.url
    })
    history.push('/login')
  } catch (error) {
    console.log(error)
    setError(error)
  }
}
