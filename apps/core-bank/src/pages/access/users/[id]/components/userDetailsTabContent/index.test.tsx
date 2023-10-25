import { INTEGRATED_RenderDynamicFields, useUnsavedChangesWarning } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { GetUserDetailsTemplateResponseData } from '@/domains/users'
import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { getUserResponseMock } from '@/domains/users/api/mocks'
import { i18nMock } from '@/_tests/mocks/i18n'

import { UserDetailsTabContent } from './index'
import { useUser } from '../../../../../../domains/users'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../../../../domains/users')

jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  useUnsavedChangesWarning: jest.fn(),
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useUserMock = useUser as jest.MockedFunction<any>

const setIsUserDetailsFormInEditModeMock = jest.fn()

const userDetailsTemplateMock: GetUserDetailsTemplateResponseData = {
  id: 'ut1',
  name: 'User Template v1',
  groups: [],
  primaryFields: [
    {
      id: 'f1',
      code: 'userName',
      entityName: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User,
      entityLevel: null,
      independent: true,
      label: 'User Name',
      required: true,
      order: 0,
      placeholder: '',
      fieldName: '',
      groupCode: null,
      helpText: '',
      tooltip: '',
      status: INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Active,
      type: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Text,
      properties: {},
      defaultValue: {},
      hiddenOnCreate: false,
      validation: {
        rules: [],
      },
    },
  ],
  customFields: [],
}

describe('UserDetailsTabContent', () => {
  afterEach(() => {
    useUserMock.mockReset()
    setIsUserDetailsFormInEditModeMock.mockReset()
  })

  it('should show component in view mode', () => {
    useUserMock.mockReturnValue({
      editUserDetails: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })

    render(
      <UserDetailsTabContent
        getUserDetailsData={getUserResponseMock}
        userDetailsTemplate={userDetailsTemplateMock}
        isUserDetailsFormInEditMode={false}
        isEditUserDetailsLoading={false}
        setIsUserDetailsFormInEditMode={setIsUserDetailsFormInEditModeMock}
      />,
      { wrapper: getAppWrapper() }
    )

    const input = screen.queryByRole('textbox', {
      name: userDetailsTemplateMock.primaryFields[0].code,
    })

    expect(screen.queryByText('access-users-[id]:tabs.details.subtitle')).toBeInTheDocument()
    expect(screen.queryByText(userDetailsTemplateMock.primaryFields[0].label)).toBeInTheDocument()
    expect(input).toHaveValue(getUserResponseMock.userName)
    expect(input).toBeDisabled()
  })

  it('should show component in edit mode', () => {
    useUserMock.mockReturnValue({
      editUserDetails: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })

    render(
      <UserDetailsTabContent
        getUserDetailsData={getUserResponseMock}
        userDetailsTemplate={userDetailsTemplateMock}
        isUserDetailsFormInEditMode={true}
        isEditUserDetailsLoading={false}
        setIsUserDetailsFormInEditMode={setIsUserDetailsFormInEditModeMock}
      />,
      { wrapper: getAppWrapper() }
    )

    const input = screen.queryByRole('textbox', {
      name: userDetailsTemplateMock.primaryFields[0].code,
    })
    const editButton = screen.queryByText('common:buttons.edit')?.closest('button')

    const cancelButton = screen.queryByText('common:buttons.cancel')?.closest('button')
    const saveButton = screen.queryByText('common:buttons.save')?.closest('button')

    expect(editButton).toBeDisabled()
    expect(screen.queryByText(userDetailsTemplateMock.primaryFields[0].label)).toBeInTheDocument()
    expect(input).toHaveValue(getUserResponseMock.userName)
    expect(input).not.toBeDisabled()
    expect(cancelButton).toBeEnabled()
    expect(saveButton).toBeInTheDocument()
  })

  it('should handle success submit of the form', async () => {
    useUserMock.mockReturnValue({
      editUserDetails: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })

    render(
      <UserDetailsTabContent
        getUserDetailsData={getUserResponseMock}
        userDetailsTemplate={userDetailsTemplateMock}
        isUserDetailsFormInEditMode={true}
        isEditUserDetailsLoading={false}
        setIsUserDetailsFormInEditMode={setIsUserDetailsFormInEditModeMock}
      />,
      { wrapper: getAppWrapper() }
    )

    const input = screen.queryByRole('textbox', {
      name: userDetailsTemplateMock.primaryFields[0].code,
    })
    const saveButton = screen.queryByText('common:buttons.save')?.closest('button')

    if (!input || !saveButton) {
      throw new Error('Unable to find elements')
    }

    act(() => {
      fireEvent.change(input, {
        target: {
          value: 'new name value',
        },
      })

      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.success')).toBeInTheDocument()
      expect(setIsUserDetailsFormInEditModeMock).toBeCalled()
    })
  })

  it('should handle failed submit of the form', async () => {
    useUserMock.mockReturnValue({
      editUserDetails: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) =>
          Promise.reject({ body: { message: '' } })
        ),
      },
    })

    render(
      <UserDetailsTabContent
        getUserDetailsData={getUserResponseMock}
        userDetailsTemplate={userDetailsTemplateMock}
        isUserDetailsFormInEditMode={true}
        isEditUserDetailsLoading={false}
        setIsUserDetailsFormInEditMode={setIsUserDetailsFormInEditModeMock}
      />,
      { wrapper: getAppWrapper() }
    )

    const input = screen.queryByRole('textbox', {
      name: userDetailsTemplateMock.primaryFields[0].code,
    })
    const saveButton = screen.queryByText('common:buttons.save')?.closest('button')

    if (!input || !saveButton) {
      throw new Error('Unable to find elements')
    }

    act(() => {
      fireEvent.change(input, {
        target: {
          value: 'new name value',
        },
      })

      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.error')).toBeInTheDocument()
      expect(setIsUserDetailsFormInEditModeMock).not.toBeCalled()
    })
  })

  it('should have unsaved changes warning in the form', () => {
    useUserMock.mockReturnValue({
      editUserDetails: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })

    render(
      <UserDetailsTabContent
        getUserDetailsData={getUserResponseMock}
        userDetailsTemplate={userDetailsTemplateMock}
        isUserDetailsFormInEditMode={true}
        isEditUserDetailsLoading={false}
        setIsUserDetailsFormInEditMode={setIsUserDetailsFormInEditModeMock}
      />,
      { wrapper: getAppWrapper() }
    )

    expect(useUnsavedChangesWarning).toBeCalled()
  })
})
