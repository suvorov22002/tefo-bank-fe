import { useUnsavedChangesWarning } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import CreateCustomFieldGroup from './index.page'
import { useCustomFieldGroup } from '../../../../domains/customFields/useCustomFieldGroup'
import { useCustomFieldGroups } from '../../../../domains/customFields/useCustomFieldGroups'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../../domains/customFields/useCustomFieldGroups')
jest.mock('../../../../domains/customFields/useCustomFieldGroup')
jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  useUnsavedChangesWarning: jest.fn(),
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCustomFieldGroupsMock = useCustomFieldGroups as jest.MockedFunction<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCustomFieldGroupMock = useCustomFieldGroup as jest.MockedFunction<any>

describe('CreateCustomFieldGroup', () => {
  afterEach(() => {
    useCustomFieldGroupsMock.mockReset()
    useCustomFieldGroupMock.mockReset()
  })

  it('should show the page content', () => {
    useCustomFieldGroupsMock.mockReturnValue({
      getCustomFieldGroups: {
        data: {
          data: [],
          totalItems: 2,
        },
        isLoading: false,
      },
    })

    useCustomFieldGroupMock.mockReturnValue({
      createCustomFieldGroup: {
        isLoading: false,
        mutateAsync: jest.fn(_data => Promise.resolve()),
      },
    })

    render(<CreateCustomFieldGroup />, { wrapper: getAppWrapper() })

    expect(screen.getByText('custom-field-groups-create:title'))
    expect(screen.getByText('custom-field-groups-create:subtitle'))

    expect(
      screen.getByRole('textbox', {
        name: 'name',
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', {
        name: 'code',
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', {
        name: 'label',
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', {
        name: 'tooltip',
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('combobox', {
        name: 'appearance',
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('spinbutton', {
        name: 'index',
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('combobox', {
        name: 'status',
      })
    ).toBeInTheDocument()
  })

  it('should handle success submit of the form', async () => {
    useCustomFieldGroupsMock.mockReturnValue({
      getCustomFieldGroups: {
        data: {
          data: [],
          totalItems: 2,
        },
        isLoading: false,
      },
    })

    useCustomFieldGroupMock.mockReturnValue({
      createCustomFieldGroup: {
        isLoading: false,
        mutateAsync: jest.fn(_data => Promise.resolve()),
      },
    })

    render(<CreateCustomFieldGroup />, { wrapper: getAppWrapper() })

    const nameInput = screen.getByRole('textbox', {
      name: 'name',
    })

    const codeInput = screen.getByRole('textbox', {
      name: 'code',
    })

    const labelInput = screen.getByRole('textbox', {
      name: 'label',
    })

    const createCustomFieldGroupButton = screen.getByRole('button', {
      name: 'common:buttons.create',
    })

    act(() => {
      fireEvent.change(nameInput, {
        target: {
          value: 'TestGroup',
        },
      })
      fireEvent.change(codeInput, {
        target: {
          value: 'TestGroupCode',
        },
      })

      fireEvent.change(labelInput, {
        target: {
          value: 'TestGroupLabel',
        },
      })

      fireEvent.click(createCustomFieldGroupButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.success')).toBeInTheDocument()
    })
  })

  it('should handle failed submit of the form', async () => {
    useCustomFieldGroupsMock.mockReturnValue({
      getCustomFieldGroups: {
        data: {
          data: [],
          totalItems: 2,
        },
        isLoading: false,
      },
    })

    useCustomFieldGroupMock.mockReturnValue({
      createCustomFieldGroup: {
        isLoading: false,
        mutateAsync: jest.fn(_data => Promise.reject({ body: { message: '' } })),
      },
    })

    render(<CreateCustomFieldGroup />, { wrapper: getAppWrapper() })

    const nameInput = screen.getByRole('textbox', {
      name: 'name',
    })

    const codeInput = screen.getByRole('textbox', {
      name: 'code',
    })

    const labelInput = screen.getByRole('textbox', {
      name: 'label',
    })

    const createCustomFieldGroupButton = screen.getByRole('button', {
      name: 'common:buttons.create',
    })

    act(() => {
      fireEvent.change(nameInput, {
        target: {
          value: 'TestGroup',
        },
      })
      fireEvent.change(codeInput, {
        target: {
          value: 'TestGroupCode',
        },
      })

      fireEvent.change(labelInput, {
        target: {
          value: 'TestGroupLabel',
        },
      })

      fireEvent.click(createCustomFieldGroupButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.error')).toBeInTheDocument()
    })
  })

  it('should call unsaved changes related hook', () => {
    useCustomFieldGroupsMock.mockReturnValue({
      getCustomFieldGroups: {
        data: {
          data: [],
          totalItems: 2,
        },
        isLoading: false,
      },
    })

    useCustomFieldGroupMock.mockReturnValue({
      createCustomFieldGroup: {
        isLoading: false,
        mutateAsync: jest.fn(_data => Promise.reject({ body: { message: '' } })),
      },
    })

    render(<CreateCustomFieldGroup />, { wrapper: getAppWrapper() })

    expect(useUnsavedChangesWarning).toBeCalled()
  })
})
