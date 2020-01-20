import Axios from 'axios'
import { API_ROUTES } from '../constants/apiRoutes'

const token = localStorage['token'] ? JSON.parse(localStorage['token']) : null
console.log(`Bearer ${token ? token.substr(1) : null}`)
const api = Axios.create({
  baseURL: API_ROUTES.base,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token ? token.substr(1) : null}`
  }
})
api.interceptors.response.use(
  response => {
    // console.log(`All right, ${response.status}`)
    return response
  },
  error => {
    // const {
    //   response: { status, data }
    // } = error
    // const { response } = error
    // if (status === 401) {
    //   console.log('Expired token')
    //   // document.location(`http://localhost:3000/${API_ROUTES.login}`)
    // }
    return Promise.reject(error)
  }
)
export { api as axios }
