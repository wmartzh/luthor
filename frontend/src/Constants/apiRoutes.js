export const API_ROUTES = {
  base: ' http://127.0.0.1:6060/api',
  login: '/login',
  getPermission: '/permissions',
  getAssistance: '/assistance',
  requestPermission: {
    method: 'POST',
    url: '/permissions'
  },
  requestWeekendsPermission: {
    method: 'POST',
    url: '/weekends'
  }
}
