import { JWT } from 'next-auth/jwt'

import { ErrorConsts } from '../../../consts'
import { refreshAccessToken } from './index'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(global as any).fetch = jest.fn()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchMock = fetch as jest.MockedFunction<any>

describe('refreshAccessToken', () => {
  afterEach(() => {
    jest.useRealTimers()
    fetchMock.mockClear()
  })

  it('should return error flag if refreshToken expired', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2023-09-15T11:11:11'))

    const tokenMock = {
      refreshTokenExpiresAt: new Date('2023-09-15T10:11:11').getTime() / 1000,
      refreshToken: 'refreshToken',
    } as JWT

    const result = await refreshAccessToken(
      tokenMock,
      'clientId',
      'clientSecret',
      'providerBaseUrl'
    )

    expect(result).toMatchObject({ ...tokenMock, error: ErrorConsts.RefreshAccessTokenError })
  })

  it('should return error flag if refresh action is failed', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2023-09-15T11:11:11'))

    fetchMock.mockReturnValue(
      Promise.reject({
        ok: false,
      })
    )

    const tokenMock = {
      refreshTokenExpiresAt: new Date('2023-09-15T12:11:11').getTime() / 1000,
      refreshToken: 'refreshToken',
    } as JWT

    const result = await refreshAccessToken(
      tokenMock,
      'clientId',
      'clientSecret',
      'providerBaseUrl'
    )

    expect(result).toMatchObject({ ...tokenMock, error: ErrorConsts.RefreshAccessTokenError })
  })

  it('should return new token if refresh action is successful', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2023-09-15T11:11:11'))

    fetchMock.mockReturnValue(
      Promise.resolve({
        ok: true,
        json: async () =>
          Promise.resolve({
            access_token: 'newAccessToken',
            expires_in: 1800,
            refresh_token: 'refreshToken',
            refresh_expires_in: 3600,
          }),
      })
    )

    const tokenMock = {
      refreshTokenExpiresAt: new Date('2023-09-15T12:11:11').getTime() / 1000,
      refreshToken: 'refreshToken',
      accessToken: 'accessToken',
    } as JWT

    const result = await refreshAccessToken(
      tokenMock,
      'clientId',
      'clientSecret',
      'providerBaseUrl'
    )

    expect(result).toMatchObject({ accessToken: 'newAccessToken' })
  })
})
