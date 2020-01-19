export const API_ROUTES = {
  base: ' http://127.0.0.1:6060/api', // no hacer commit a esto
  login: '/login',
  getPermission: '/permissions',
  getAssistance: '/assistance',
  getStatus: {
    method: 'GET',
    url: '/user-status'
  },
  requestPermission: {
    method: 'POST',
    url: '/permissions'
  },
  requestWeekendsPermission: {
    method: 'POST',
    url: '/weekends'
  },
  createEvent: {
    method: 'POST',
    url: '/events'
  },
  getStudents: {
    method: 'GET',
    url: '/students'
  },
  getPenalties: {
    method: 'GET',
    url: '/penalties'
  },
  getEvents: {
    method: 'GET',
    url: '/events'
  }
}

// id: 1
// title: "Culto 01"
// start_time: "04:31:55"
// created_at: "2020-01-06 04:32:01"
// updated_at: "2020-01-06 04:32:04"
