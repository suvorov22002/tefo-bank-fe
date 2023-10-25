import { JWT } from 'next-auth/jwt'

import { signOutHandshake } from './index'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(global as any).fetch = jest.fn()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchMock = fetch as jest.MockedFunction<any>

describe('signOutHandshake', () => {
  afterEach(() => {
    fetchMock.mockClear()
  })

  it('should call api with appropriate parameters', () => {
    fetchMock.mockReturnValue(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(),
      })
    )
    const tokenMock = { idToken: 'testIdToken' } as JWT

    signOutHandshake(tokenMock, 'providerBaseUrl')

    expect(fetch).toBeCalledWith('providerBaseUrl/logout?id_token_hint=testIdToken')
  })
})
