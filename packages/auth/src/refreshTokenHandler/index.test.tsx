import { render } from '@testing-library/react'
import { useSession } from 'next-auth/react'
import '@testing-library/jest-dom'

import { RefreshTokenHandler } from '.'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useSessionMock = useSession as jest.MockedFunction<any>
const setRefreshIntervalMock = jest.fn()
const onSessionUpdateMock = jest.fn()

describe('RefreshTokenHandler', () => {
  afterEach(() => {
    useSessionMock.mockReset()
  })
  afterEach(() => {
    jest.useRealTimers()
  })

  it('should set refetch interval to 1 second if shouldRefreshAccessTokenAt is less or equal to current datetime', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2023-09-15T11:11:11'))

    useSessionMock.mockReturnValue({
      data: {
        shouldRefreshAccessTokenAt: new Date('2023-09-15T11:11:11').getTime() / 1000,
      },
    })

    render(<RefreshTokenHandler setRefreshInterval={setRefreshIntervalMock} />)

    expect(setRefreshIntervalMock).toBeCalledWith(1)
  })

  it('should set refetch interval to remaining time if shouldRefreshAccessTokenAt is after current datetime', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2023-09-15T11:11:11'))

    useSessionMock.mockReturnValue({
      data: {
        shouldRefreshAccessTokenAt: new Date('2023-09-15T11:11:51').getTime() / 1000,
      },
    })

    render(<RefreshTokenHandler setRefreshInterval={setRefreshIntervalMock} />)

    expect(setRefreshIntervalMock).toBeCalledWith(40)
  })

  it('should handle onSessionUpdate callback', async () => {
    const session = {
      test: 'test',
    }

    useSessionMock.mockReturnValue({
      data: session,
    })

    render(
      <RefreshTokenHandler
        setRefreshInterval={() => undefined}
        onSessionUpdate={onSessionUpdateMock}
      />
    )

    expect(onSessionUpdateMock).toBeCalledWith(session)
  })
})
