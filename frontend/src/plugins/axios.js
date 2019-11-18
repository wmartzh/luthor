import Axios from 'axios'

const URI = {
  server: 'http://localhost:8080/api'
}

const api = Axios.create({
  baseURL: URI.server,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
