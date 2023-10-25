import { JWT } from 'next-auth/jwt'
import { Session } from 'next-auth'

export const session = async ({ session, token }: { session: Session; token: JWT }) => {
  session.tokenType = token.tokenType
  session.accessToken = token.accessToken
  session.expiresAt = token.expiresAt
  session.shouldRefreshAccessTokenAt = token.shouldRefreshAccessTokenAt
  session.userId = token.userId
  session.error = token.error

  return session
}
