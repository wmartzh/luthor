import { axios } from '../plugins/axios'

export const submitService = async (method, url, data, id) => {
  const request = await axios({
    method: method,
    url: url,
    data: data
  })
  if (request.status === 200) {
    return request.data
  }
  console.log(request)
}
