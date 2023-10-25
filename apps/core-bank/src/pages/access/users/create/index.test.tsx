import { INTEGRATED_RenderDynamicFields, useUnsavedChangesWarning } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { GetUserDetailsTemplateResponseData } from '@/domains/users'
import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import CreateUser from './index.page'
import { useUser } from '../../../../domains/users/useUser'
import { useUserDetailsTemplate } from '../../../../domains/users/useUserDetailsTemplate'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../../domains/users/useUser')
jest.mock('../../../../domains/users/useUserDetailsTemplate')
jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
  useUnsavedChangesWarning: jest.fn(),
}))

const userTemplateMock: GetUserDetailsTemplateResponseData = {
  id: 'ut1',
  name: 'User Template v1',
  primaryFields: [
    {
      id: 'f1',
      code: 'userName',
      entityName: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User,
      entityLevel: null,
      hiddenOnCreate: false,
      status: INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Active,
      independent: true,
      label: 'User Name',
      required: true,
      order: 0,
      placeholder: '',
      fieldName: '',
      groupCode: null,
      helpText: '',
      tooltip: '',
      defaultValue: {},
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

describe('CreateUser page', () => {
  afterEach(() => {
    useUserMock.mockReset()
    useUserDetailsTemplateMock.mockReset()
  })

  it('should show loading indicator while data is fetching', () => {
    useUserMock.mockReturnValue({
      createUser: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) => Promise.resolve()),
      },
    })
    useUserDetailsTemplateMock.mockReturnValue({
      getUserDetailsTemplate: {
        isLoading: true,
        data: undefined,
      },
    })

    render(<CreateUser />, { wrapper: getAppWrapper() })

    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
    expect(screen.queryByText('access-users-create:title')).not.toBeInTheDocument()
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })

  it('should show the page content', () => {
    useUserMock.mockReturnValue({
      createUser: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) => Promise.resolve()),
      },
    })
    useUserDetailsTemplateMock.mockReturnValue({
      getUserDetailsTemplate: {
        isLoading: false,
        data: userTemplateMock,
      },
    })

    render(<CreateUser />, { wrapper: getAppWrapper() })

    expect(screen.queryByTestId('loading-component')).not.toBeInTheDocument()
    expect(screen.queryByText('access-users-create:title')).toBeInTheDocument()
    expect(screen.queryByRole('form')).toBeInTheDocument()
    expect(screen.queryByRole('textbox', { name: 'userName' })).toBeInTheDocument()
    expect(screen.queryByText('User Name')).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'access-users-create:buttons.createUser' })
    ).toBeEnabled()
  })

  it('should handle success submit of the form', async () => {
    useUserMock.mockReturnValue({
      createUser: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) => Promise.resolve()),
      },
    })
    useUserDetailsTemplateMock.mockReturnValue({
      getUserDetailsTemplate: {
        isLoading: false,
        data: userTemplateMock,
      },
    })

    render(<CreateUser />, { wrapper: getAppWrapper() })

    const input = screen.getByRole('textbox', { name: 'userName' })
    const createUserButton = screen.getByRole('button', {
      name: 'access-users-create:buttons.createUser',
    })

    act(() => {
      fireEvent.change(input, {
        target: {
          value: 'Test User',
        },
      })

      fireEvent.click(createUserButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.success')).toBeInTheDocument()
    })
  })

  it('should handle failed submit of the form', async () => {
    useUserMock.mockReturnValue({
      createUser: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) =>
          Promise.reject({ body: { message: '' } })
        ),
      },
    })
    useUserDetailsTemplateMock.mockReturnValue({
      getUserDetailsTemplate: {
        isLoading: false,
        data: userTemplateMock,
      },
    })

    render(<CreateUser />, { wrapper: getAppWrapper() })

    const input = screen.getByRole('textbox', { name: 'userName' })
    const createUserButton = screen.getByRole('button', {
      name: 'access-users-create:buttons.createUser',
    })

    act(() => {
      fireEvent.change(input, {
        target: {
          value: 'Test User',
        },
      })

      fireEvent.click(createUserButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.error')).toBeInTheDocument()
      expect(input).not.toBeDisabled()
      expect(input).toHaveValue('Test User')
      expect(createUserButton).toBeInTheDocument()
      expect(createUserButton).not.toBeDisabled()
    })
  })

  it('should have unsaved changes handling', async () => {
    useUserMock.mockReturnValue({
      createUser: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) => Promise.resolve()),
      },
    })
    useUserDetailsTemplateMock.mockReturnValue({
      getUserDetailsTemplate: {
        isLoading: false,
        data: userTemplateMock,
      },
    })

    render(<CreateUser />, { wrapper: getAppWrapper() })

    expect(useUnsavedChangesWarning).toBeCalled()
  })
})
