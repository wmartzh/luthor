import axios from '../plugins/axios'

export const login = async credentials => {
  try {
    const response = axios.post('api/auth/login', credentials)
    console.log(response.status)
  } catch (error) {
    console.error(error)
  }
}
