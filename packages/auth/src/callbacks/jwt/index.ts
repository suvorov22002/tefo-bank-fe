import { JWT } from 'next-auth/jwt'
import { Account, Profile } from 'next-auth'

import { EXPIRES_THRESHOLD_MULTIPLIER } from '../../consts'
import { refreshAccessToken } from '../helpers/refreshAccessToken'

const getAccessTokenRecommendedExpiresAt = (expiresAt: number | undefined) =>
  expiresAt &&
  Math.round((expiresAt - Math.round(Date.now() / 1000)) * EXPIRES_THRESHOLD_MULTIPLIER) +
    Math.round(Date.now() / 1000)

export const jwt = async ({
  token,
  account,
  profile,
  clientId,
  clientSecret,
  providerBaseUrl,
}: {
  token: JWT
  account: Account | null
  profile: Profile | undefined
  clientId: string
  clientSecret: string
  providerBaseUrl: string
}) => {
  if (account && profile) {
    token.exp = account.expires_at
    token.idToken = account.id_token
    token.tokenType = account.token_type
    token.accessToken = account.access_token
    token.refreshToken = account.refresh_token
    token.userId = profile.user_id
    token.expiresAt = account.expires_at
    token.shouldRefreshAccessTokenAt = getAccessTokenRecommendedExpiresAt(account.expires_at)
    token.refreshTokenExpiresAt = account.refresh_expires_in + Math.round(Date.now() / 1000)

    return token
  }

  if (token.shouldRefreshAccessTokenAt && Date.now() < token.shouldRefreshAccessTokenAt * 1000)
    return token

  return refreshAccessToken(token, clientId, clientSecret, providerBaseUrl)
}
