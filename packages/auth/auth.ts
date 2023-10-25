export interface Session {
  tokenType?: string
  accessToken?: string
  error: string
  userId: string
  expiresAt?: number
  shouldRefreshAccessTokenAt?: number
}

export interface User {
  user_id: string
}

export interface Account {
  access_token: string
  expires_at?: number
  refresh_expires_in: number
  refresh_token: string
  token_type: string
  id_token: string
}

export interface Profile {
  user_id: string
}

export interface JWT {
  user: User
  exp?: number
  accessToken?: string
  refreshToken?: string
  expiresAt?: number
  shouldRefreshAccessTokenAt?: number
  refreshTokenExpiresAt: number
  tokenType?: string
  userId: string
  idToken?: string
  error: string
}
