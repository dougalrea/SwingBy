export function setToken(token) {
  window.localStorage.setItem('token', token)
}

export function getToken() {
  return window.localStorage.getItem('token')
}

export function logoutUser() {
  window.localStorage.removeItem('token')
}

function getPayload() {
  const token = getToken()
  if (!token) return false
  const parts = token.split('.')
  if (parts.length < 3) return false
  return JSON.parse(window.atob(parts[1]))
}

export function isAuthenticated() {
  const payload = getPayload()
  if (!payload) return false
  const now = Math.floor(Date.now() / 1000)
  return now < payload.exp
}

export function isOwner(userId) {
  const payload = getPayload()
  if (!payload) return false
  return userId === payload.sub
}