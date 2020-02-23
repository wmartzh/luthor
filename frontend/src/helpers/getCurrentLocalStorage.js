const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

export const getCurrentToken = token ? JSON.parse(token).substr(1) : ''

export const getCurrentRole = token ? JSON.parse(token)[0] : ''

const userData = user ? JSON.parse(user) : {}

export const getCurrentUser = user ? { ...userData, role: getCurrentRole } : {}
