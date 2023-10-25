import { JWT } from 'next-auth/jwt'

import { EXPIRES_THRESHOLD_MULTIPLIER, ErrorConsts } from '../../../consts'

interface RefreshTokenArgs {
  details: {
    client_id: string
    client_secret: string
    grant_type: string
    refresh_token?: string
  }
  providerBaseUrl: string
}

const refreshToken = async ({ details, providerBaseUrl }: RefreshTokenArgs) => {
  const url = `${providerBaseUrl}/token`

  const formBody: string[] = []

  Object.entries(details).forEach(([key, value]: [string, string]) => {
    const encodedKey = encodeURIComponent(key)
    const encodedValue = encodeURIComponent(value)

    formBody.push(encodedKey + '=' + encodedValue)
  })
  const formData = formBody.join('&')

  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: formData,
  })
}

export const refreshAccessToken = async (
  token: JWT,
  clientId: string,
  clientSecret: string,
  providerBaseUrl: string
) => {
  try {
    if (token.refreshTokenExpiresAt && Date.now() > token.refreshTokenExpiresAt * 1000) throw Error

    const details = {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
    }

    const refreshTokenResponse = await refreshToken({ details, providerBaseUrl })
    const refreshedToken = await refreshTokenResponse.json()

    if (!refreshTokenResponse.ok) throw refreshedToken

    const result = {
      ...token,
      accessToken: refreshedToken.access_token,
      expiresAt: refreshedToken.expires_in + Math.round(Date.now() / 1000),
      shouldRefreshAccessTokenAt:
        Math.round(refreshedToken.expires_in * EXPIRES_THRESHOLD_MULTIPLIER) +
        Math.round(Date.now() / 1000),
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
      refreshTokenExpiresAt: refreshedToken.refresh_expires_in + Math.round(Date.now() / 1000),
    }

    return result
  } catch (error) {
    return {
      ...token,
      error: ErrorConsts.RefreshAccessTokenError,
    }
  }
}
