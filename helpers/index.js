import jwtDecode from 'jwt-decode'
const cookieparser = require('cookieparser')

export function getUserFromCookie(req) {
  if (process.server && process.static) return
  if (!req.headers.cookie) return
  if (req.headers.cookie) {
    const parsed = cookieparser.parse(req.headers.cookie)
    const accessTokenCookie = parsed.access_token
    if (!accessTokenCookie) return
    const decodedToken = jwtDecode(accessTokenCookie)
    if (!decodedToken) return
    return decodedToken
  }
}

export function getUserFromSession(req) {
  console.log('[CHECK-AUTH] - checking if user is stored in session')
  return req.sesion ? req.session.userId : null
}