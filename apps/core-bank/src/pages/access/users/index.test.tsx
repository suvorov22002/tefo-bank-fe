import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { UserStatuses } from '@/domains/users'
import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { getUsersResponseMock } from '@/domains/users/api/mocks'
import { i18nMock } from '@/_tests/mocks/i18n'

import UsersPage from './index.page'
import { useUser } from '../../../domains/users/useUser'
import { useUsers } from '../../../domains/users/useUsers'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../domains/users/useUser')
jest.mock('../../../domains/users/useUsers')
jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useUserMock = useUser as jest.MockedFunction<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useUsersMock = useUsers as jest.MockedFunction<any>

describe('Users page', () => {
  afterEach(() => {
    useUserMock.mockReset()
    useUsersMock.mockReset()
  })

  it('should show loading indicator while data is fetching', () => {
    useUserMock.mockReturnValue({
      resetUserPassword: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })
    useUsersMock.mockReturnValue({
      getUsers: {
        data: undefined,
        isLoading: true,
      },
    })

    render(<UsersPage />, { wrapper: getAppWrapper() })

    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
    expect(screen.queryByText('access-users:title')).not.toBeInTheDocument()
  })

  it('should show the page with empty state if there is no created users', () => {
    useUserMock.mockReturnValue({
      resetUserPassword: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })
    useUsersMock.mockReturnValue({
      getUsers: {
        data: {
          data: [],
          page: 1,
          limit: 10,
          totalItems: 0,
        },
        isLoading: false,
      },
    })

    render(<UsersPage />, { wrapper: getAppWrapper() })

    const createButton = screen.getByRole('button', {
      name: 'access-users:buttons.addUser',
    })

    expect(screen.getByText('access-users:empty'))
    expect(createButton).toBeInTheDocument()
    expect(createButton).not.toBeDisabled()
  })

  it('should show the page content if there are created users', () => {
    const mockUser = getUsersResponseMock.data[0]

    useUserMock.mockReturnValue({
      resetUserPassword: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })
    useUsersMock.mockReturnValue({
      getUsers: {
        data: {
          data: [mockUser],
          page: 1,
          limit: 10,
          totalItems: 0,
        },
        isLoading: false,
      },
    })

    render(<UsersPage />, { wrapper: getAppWrapper() })

    expect(screen.getByText('access-users:title')).toBeInTheDocument()
    expect(screen.getByText('access-users:subtitle')).toBeInTheDocument()
    expect(screen.queryByRole('table')).toBeInTheDocument()
    expect(screen.getByText(mockUser.userName)).toBeInTheDocument()
    expect(screen.getByText(mockUser.firstName)).toBeInTheDocument()
    expect(screen.getByText(mockUser.lastName)).toBeInTheDocument()
    expect(screen.getByText(mockUser.title)).toBeInTheDocument()
    expect(screen.getByText(mockUser.email)).toBeInTheDocument()
    // TODO: Uncomment after date format handling will be added
    // expect(screen.getByText(mockUser.lastLoginDate)).toBeInTheDocument()
    expect(screen.getByText('access-users:usersTable.userStatuses.active')).toBeInTheDocument()
  })

  it('should handle approve action when user is NEW', () => {
    const mockUser = { ...getUsersResponseMock.data[0], status: UserStatuses.New }

    useUsersMock.mockReturnValue({
      getUsers: {
        data: {
          data: [mockUser],
          page: 1,
          limit: 10,
          totalItems: 0,
        },
        isLoading: false,
      },
    })

    useUserMock.mockReturnValue({
      approveUser: {
        isLoading: false,
        mutateAsync: jest.fn(() => Promise.resolve({ password: '123456' })),
      },
    })

    render(<UsersPage />, { wrapper: getAppWrapper() })

    const pageControlsButton = screen.getByRole('button', { name: '...' })

    waitFor(() => {
      act(() => {
        fireEvent.click(pageControlsButton)
      })
    })

    const approveButton = screen.getByText('access-users:usersTable.rowActions.approve')

    expect(approveButton).toBeInTheDocument()

    act(() => {
      fireEvent.click(approveButton)
    })

    waitFor(() => {
      const resetPasswordModalTitle = screen.getByText(
        'access-users-[id]:modals.resetPassword.title'
      )
      const otp = screen.getByText('123456')

      expect(resetPasswordModalTitle).toBeInTheDocument()
      expect(otp).toBeInTheDocument()
    })
  })

  it('should handle reset password action when user is PENDING', () => {
    const mockUser = { ...getUsersResponseMock.data[0], status: UserStatuses.Pending }

    useUsersMock.mockReturnValue({
      getUsers: {
        data: {
          data: [mockUser],
          page: 1,
          limit: 10,
          totalItems: 0,
        },
        isLoading: false,
      },
    })

    useUserMock.mockReturnValue({
      resetUserPassword: {
        isLoading: false,
        mutateAsync: jest.fn(() => Promise.resolve({ password: '123456' })),
      },
    })

    render(<UsersPage />, { wrapper: getAppWrapper() })

    const pageControlsButton = screen.getByRole('button', { name: '...' })

    waitFor(() => {
      act(() => {
        fireEvent.click(pageControlsButton)
      })
    })

    const resetPasswordButton = screen.getByText('access-users:usersTable.rowActions.resetPassword')

    expect(resetPasswordButton).toBeInTheDocument()

    act(() => {
      fireEvent.click(resetPasswordButton)
    })

    waitFor(() => {
      const resetPasswordModalTitle = screen.getByText(
        'access-users-[id]:modals.resetPassword.title'
      )
      const otp = screen.getByText('123456')

      expect(resetPasswordModalTitle).toBeInTheDocument()
      expect(otp).toBeInTheDocument()
    })
  })

  it('should handle inactivate action when user is BLOCKED', () => {
    const mockUser = { ...getUsersResponseMock.data[0], status: UserStatuses.Pending }

    useUsersMock.mockReturnValue({
      getUsers: {
        data: {
          data: [mockUser],
          page: 1,
          limit: 10,
          totalItems: 0,
        },
        isLoading: false,
      },
    })

    useUserMock.mockReturnValue({
      inactivateUser: {
        isLoading: false,
        mutateAsync: jest.fn(() => Promise.resolve({ password: '123456' })),
      },
    })

    render(<UsersPage />, { wrapper: getAppWrapper() })

    const pageControlsButton = screen.getByRole('button', { name: '...' })

    waitFor(() => {
      act(() => {
        fireEvent.click(pageControlsButton)
      })
    })

    const inactivateButton = screen.getByText('access-users:usersTable.rowActions.inactivate')

    inactivateButton.onclick = jest.fn()

    expect(inactivateButton).toBeInTheDocument()

    waitFor(() => {
      act(() => {
        fireEvent.click(inactivateButton)
      })
    })

    expect(inactivateButton.onclick).toBeCalled()
  })
})
