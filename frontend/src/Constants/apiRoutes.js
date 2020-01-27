export const API_ROUTES = {
  base: ' http://127.0.0.1:6060/api',
  login: '/login',
  logout: {
    method: 'POST',
    url: '/logout'
  },
  getPermission: {
    method: 'GET',
    url: '/permissions'
  },
  getAssistance: {
    method: 'GET',
    url: '/assistance'
  },
  getStatus: {
    method: 'GET',
    url: '/user-status'
  },
  requestPermission: {
    method: 'POST',
    url: '/permissions'
  },
  updatePermission: {
    method: 'PUT',
    url: '/permissions'
  },
  requestWeekendsPermission: {
    method: 'POST',
    url: '/weekends'
  },
  updateWeekendsPermission: {
    method: 'PUT',
    url: '/weekends'
  },
  createEvent: {
    method: 'POST',
    url: '/events'
  },
  updateEvent: {
    method: 'PUT',
    url: '/events'
  },
  deleteEvent: {
    method: 'DELETE',
    url: '/events'
  },
  getStudents: {
    method: 'GET',
    url: {
      base: '/students',
      male: '/students/male',
      female: '/students/female'
    }
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
