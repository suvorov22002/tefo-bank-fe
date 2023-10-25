import { INTEGRATED_RenderDynamicFields } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { UserStatuses } from '@/domains/users'
import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import UserDetails from './index.page'
import { useUser } from '../../../../domains/users/useUser'
import { useUserDetailsTemplate } from '../../../../domains/users/useUserDetailsTemplate'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../../domains/users/useUser')
jest.mock('../../../../domains/users/useUserDetailsTemplate')
jest.mock('../../../../domains/users/useUserJobTypes')
jest.mock('../../../../domains/users/useUserCustomPermissions')

jest.mock('./components', () => ({
  CustomPermissionsTabContent: () => <div data-testid="customPermissionsTabContent" />,
  JobTypesTabContent: () => <div data-testid="jobTypesTabContent" />,
  UserDetailsTabContent: () => <div data-testid="userDetailsTabContent" />,
}))

jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
  useUnsavedChangesWarning: jest.fn(),
}))

const userDetailsMock = {
  userName: 'userName',
}

const userDetailsTemplateMock: INTEGRATED_RenderDynamicFields.DynamicFieldsTemplate = {
  id: 'ut1',
  name: 'User Template v1',
  primaryFields: [
    {
      id: 'f1',
      code: 'userName',
      entityName: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User,
      entityLevel: null,
      independent: true,
      label: 'User Name',
      hiddenOnCreate: false,
      required: true,
      order: 0,
      placeholder: '',
      fieldName: '',
      groupCode: null,
      status: INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Active,
      defaultValue: {},
      helpText: '',
      tooltip: '',
      type: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Text,
      properties: {},
      validation: {
        rules: [],
      },
    },
  ],
  customFields: [],
  groups: [],
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useUserMock = useUser as jest.MockedFunction<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useUserDetailsTemplateMock = useUserDetailsTemplate as jest.MockedFunction<any>

describe('UserDetails page', () => {
  afterEach(() => {
    useUserMock.mockReset()
    useUserDetailsTemplateMock.mockReset()
  })

  it('should show loading indicator while data is fetching', () => {
    useUserMock.mockReturnValue({
      getUser: {
        isLoading: true,
        data: undefined,
      },
      editUserDetails: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
      resetUserPassword: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })
    useUserDetailsTemplateMock.mockReturnValue({
      getUserDetailsTemplate: {
        isLoading: true,
        data: undefined,
      },
    })

    render(<UserDetails />, { wrapper: getAppWrapper() })

    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
    expect(screen.queryByTestId('customPermissionsTabContent')).not.toBeInTheDocument()
    expect(screen.queryByTestId('jobTypesTabContent')).not.toBeInTheDocument()
    expect(screen.queryByTestId('userDetailsTabContent')).not.toBeInTheDocument()
  })

  it('should show the page content after data is fetched', () => {
    useUserMock.mockReturnValue({
      getUser: {
        isLoading: false,
        data: userDetailsMock,
      },
      editUserDetails: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
      resetUserPassword: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })
    useUserDetailsTemplateMock.mockReturnValue({
      getUserDetailsTemplate: {
        isLoading: false,
        data: userDetailsTemplateMock,
      },
    })

    render(<UserDetails />, { wrapper: getAppWrapper() })

    expect(screen.queryByText('access-users-[id]:tabs.details.label')).toBeInTheDocument()
    expect(screen.queryByText('access-users-[id]:tabs.jobTypes.label')).toBeInTheDocument()
    expect(screen.queryByText('access-users-[id]:tabs.customPermissions.label')).toBeInTheDocument()
    expect(screen.queryByTestId('userDetailsTabContent')).toBeInTheDocument()
    expect(screen.queryByTestId('customPermissionsTabContent')).not.toBeInTheDocument()
    expect(screen.queryByTestId('jobTypesTabContent')).not.toBeInTheDocument()
  })

  it('should switch tabs', () => {
    useUserMock.mockReturnValue({
      getUser: {
        isLoading: false,
        data: userDetailsMock,
      },
      editUserDetails: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
      resetUserPassword: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })
    useUserDetailsTemplateMock.mockReturnValue({
      getUserDetailsTemplate: {
        isLoading: false,
        data: userDetailsTemplateMock,
      },
    })

    render(<UserDetails />, { wrapper: getAppWrapper() })

    const jobTypesTab = screen.getByText('access-users-[id]:tabs.jobTypes.label')

    fireEvent.click(jobTypesTab)

    expect(screen.getByTestId('jobTypesTabContent')).toBeInTheDocument()
  })

  it('should handle approve action when user is NEW', () => {
    useUserMock.mockReturnValue({
      getUser: {
        isLoading: false,
        data: {
          ...userDetailsMock,
          status: UserStatuses.New,
        },
      },
      editUserDetails: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
      approveUser: {
        isLoading: false,
        mutateAsync: jest.fn(() => Promise.resolve({ password: '123456' })),
      },
    })
    useUserDetailsTemplateMock.mockReturnValue({
      getUserDetailsTemplate: {
        isLoading: false,
        data: userDetailsTemplateMock,
      },
    })

    render(<UserDetails />, { wrapper: getAppWrapper() })

    const pageControlsButton = screen.getByRole('button', { name: '...' })

    waitFor(() => {
      act(() => {
        fireEvent.click(pageControlsButton)
      })
    })

    const approveButton = screen.getByText('access-users-[id]:pageControls.approve')

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
    useUserMock.mockReturnValue({
      getUser: {
        isLoading: false,
        data: {
          ...userDetailsMock,
          status: UserStatuses.Pending,
        },
      },
      editUserDetails: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
      resetUserPassword: {
        isLoading: false,
        mutateAsync: jest.fn(() => Promise.resolve({ password: '123456' })),
      },
    })
    useUserDetailsTemplateMock.mockReturnValue({
      getUserDetailsTemplate: {
        isLoading: false,
        data: userDetailsTemplateMock,
      },
    })

    render(<UserDetails />, { wrapper: getAppWrapper() })

    const pageControlsButton = screen.getByRole('button', { name: '...' })

    waitFor(() => {
      act(() => {
        fireEvent.click(pageControlsButton)
      })
    })

    const resetPasswordButton = screen.getByText('access-users-[id]:pageControls.resetPassword')

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
    useUserMock.mockReturnValue({
      getUser: {
        isLoading: false,
        data: {
          ...userDetailsMock,
          status: UserStatuses.Blocked,
        },
      },
      editUserDetails: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
      inactivateUser: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })
    useUserDetailsTemplateMock.mockReturnValue({
      getUserDetailsTemplate: {
        isLoading: false,
        data: userDetailsTemplateMock,
      },
    })

    render(<UserDetails />, { wrapper: getAppWrapper() })

    const pageControlsButton = screen.getByRole('button', { name: '...' })

    waitFor(() => {
      act(() => {
        fireEvent.click(pageControlsButton)
      })
    })

    const inactivateButton = screen.getByText('access-users-[id]:pageControls.inactivate')

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
