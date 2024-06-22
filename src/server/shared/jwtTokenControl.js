import * as jose from 'jose'

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.TOKEN_SECRET),
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const isAuthenticated = async req => {
  let token = req.headers.get('authorization') || req.headers.get('Authorization')
  if (token) {
    try {
      if (token.startsWith('Bearer')) {
        token = token.replace('Bearer ', '')
      }

      const decoded = await jose.jwtVerify(token, jwtConfig.secret)
      
      if (decoded.payload?.id) {
        return true
      } else {
        return false
      }
    } catch (err) {
      console.error('isAuthenticated error: ', err)

      return false
    }
  } else {
    return false
  }
}