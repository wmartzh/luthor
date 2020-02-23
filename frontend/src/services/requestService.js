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
      // headers: {
      //   Authorization:
      //     'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYTAzYzI2ZjUxYTE4N2UyZTQ3MmQ5MjA5MzgyMTM2NGE2NTJhZGMzNzUzNmFkYjc3N2RjOTg0YzRmNjg3ZTFiZDllOGVkMjY2NzY5NjJlYmYiLCJpYXQiOjE1ODAxMDc0NjYsIm5iZiI6MTU4MDEwNzQ2NiwiZXhwIjoxNjExNzI5ODY2LCJzdWIiOiI4Iiwic2NvcGVzIjpbXX0.bCNh-jeKs7_iHwEMt1y0xiqDhZThOwaoGoVZb5sYCU36R81UUixYgJHZJg25PZKZZeLgZyFcR6ZA61P4x47Yn6bKT91Lv3hVKY-EMkEgPSfB3F5b_t-NUudIvMHW1gGFKBHmY9IVk6XXBw4IDa6mmVQHNRR8VvwutEpehzf9odQqg7asqyqFRgKZ3xVLKHzKcXURv46CdFz-ri9qKygNNg5iyjOzzg9kgc2QGX9ifAWaSu5TU-QTB-9XegFZdnDwWtCk1ce6Waw-j6xk7UMQwaHyxzy6ukpIr5IJXbILKDrt4rbRc7rdh9rdUEErLoa5EYDf5LUbLrD8E2y-DX9ciVN_dBFf4GH1BRUUO-BlSB_HoA4qY5bAYc1I5O2vbB_aBYZ3Jo18AfURmSsosNklf6TjYK61We3K3N12qCxsWrpp7sUOXrYcXtcPD6IwFOVDqCu2DhzgT6VROXCDi10tfKmH2CNNYzNsMcGPppnjC0yUfH5zYG3bgqY5O7t_4mn8WVmt-iBjLFBoGjTckkhFlea1PT7-Coc2wdzuhb1wHrw_Yk5dHpMU6TofW8ZuoOpzQIgfK8R4BdPERkh7Hu4AODxfsFn8ZEalxVNUFxzanwILEeO4Xlo-Q4Z2vRx3eHVVFTE0k5Xy3vRoHn9SHytrTKMqncIk3LTwTmFGS9r6ta8'
      // }
    })
    if (request.status === 200) {
      setData(request.data.data)
    }
  } catch (error) {
    setError(error)
  }
  setLoading(false)
}
