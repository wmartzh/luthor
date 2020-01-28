import Axios from 'axios'
import { API_ROUTES } from '../constants/apiRoutes'

const axios = Axios.create({
  baseURL: API_ROUTES.base,
  headers: {
    'Content-Type': 'application/json'
  }
})

axios.interceptors.response.use(
  response => {
    // console.log(`All right, ${response.status}`)
    return response
  },
  error => {
    const {
      response: { status, data }
    } = error

    console.log(`Error status = ${status}`)
    if (status === 401) {
      console.log('Expired token')
    }
    return Promise.reject(error)
  }
)
export { axios }
