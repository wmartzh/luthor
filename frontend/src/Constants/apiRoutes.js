export const API_ROUTES = {
  base: ' http://127.0.0.1:8000/api',
  login: '/login',
  register: {
    method: 'POST',
    url: '/register'
  },
  logout: {
    method: 'POST',
    url: '/logout'
  },
  getFilter: {
    method: 'GET',
    url: '/students/filter',
    params: {
      active: '/active',
      inactives: '/inactives',
      penalized: '/penalized',
      out: '/out',
      indicators: '/indicators'
    }
  },
  getActualEvent: {
    method: 'GET',
    url: '/actual-event'
  },
  getWeekends: {
    method: 'GET',
    url: '/weekends'
  },
  getPermission: {
    method: 'GET',
    url: '/permissions'
  },
  getAssistance: {
    method: 'GET',
    url: '/assistance'
  },
  checkAssistance: {
    method: 'POST',
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
  updateWeekendsApprove: {
    method: 'PUT',
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
  getPenaltiesActive: {
    method: 'GET',
    url: '/active-penalties'
  },
  getPenalties: {
    method: 'GET',
    url: '/penalties'
  },
  penalizeUser: {
    method: 'POST',
    url: '/penalties'
  },
  updatePenalizeUser: {
    method: 'PUT',
    url: '/penalties'
  },
  getEvents: {
    method: 'GET',
    url: '/events'
  },
  blockAll: {
    method: 'PUT',
    url: '/students/block-all'
  }
}
