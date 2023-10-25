import { render, screen } from '@testing-library/react'
import { signIn, useSession } from 'next-auth/react'
import '@testing-library/jest-dom'

import { ErrorConsts } from '../consts'
import { WithAuth } from '.'

jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useSessionMock = useSession as jest.MockedFunction<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const signInMock = signIn as jest.MockedFunction<any>

describe('WithAuth', () => {
  afterEach(() => {
    useSessionMock.mockReset()
  })

  it('should show loading indicator while data is fetching', async () => {
    useSessionMock.mockReturnValue({
      data: null,
      status: 'loading',
    })

    render(<WithAuth>content</WithAuth>)

    expect(screen.queryByText('content')).not.toBeInTheDocument()
    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
  })

  it('should redirect to sign in page if session status is unauthenticated', async () => {
    useSessionMock.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    })

    render(<WithAuth>content</WithAuth>)

    expect(screen.queryByText('content')).not.toBeInTheDocument()
    expect(signInMock).toBeCalled()
  })

  it('should redirect to sign in page if refresh token failed', async () => {
    useSessionMock.mockReturnValue({
      data: {
        error: ErrorConsts.RefreshAccessTokenError,
      },
      status: 'authenticated',
    })

    render(<WithAuth>content</WithAuth>)

    expect(screen.queryByText('content')).not.toBeInTheDocument()
    expect(signInMock).toBeCalled()
  })

  it('should show content if session status is authenticated', async () => {
    useSessionMock.mockReturnValue({
      data: {},
      status: 'authenticated',
    })

    render(<WithAuth>content</WithAuth>)

    expect(screen.queryByText('content')).toBeInTheDocument()
  })
})
