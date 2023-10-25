import { useUnsavedChangesWarning } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { createCustomFieldGroupRequestDataMock } from '@/domains/customFields/api/mocks'
import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import CustomFieldGroup from './index.page'
import { useCustomFieldGroup } from '../../../../../domains/customFields/useCustomFieldGroup'
import { useCustomFieldGroups } from '../../../../../domains/customFields/useCustomFieldGroups'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../../../domains/customFields/useCustomFieldGroup')
jest.mock('../../../../../domains/customFields/useCustomFieldGroups')
jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
  useUnsavedChangesWarning: jest.fn(),
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCustomFieldGroupsMock = useCustomFieldGroups as jest.MockedFunction<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCustomFieldGroupMock = useCustomFieldGroup as jest.MockedFunction<any>

describe('CustomFieldGroup', () => {
  afterEach(() => {
    useCustomFieldGroupsMock.mockReset()
    useCustomFieldGroupMock.mockReset()
  })

  it('should show loading indicator while data is loading', () => {
    useCustomFieldGroupsMock.mockReturnValue({
      getCustomFieldGroups: {
        data: undefined,
        isLoading: true,
      },
    })

    useCustomFieldGroupMock.mockReturnValue({
      getCustomFieldGroup: {
        data: undefined,
        isLoading: true,
      },
      editCustomFieldGroup: {
        isLoading: false,
        mutateAsync: jest.fn(_data => Promise.resolve()),
      },
    })

    render(<CustomFieldGroup />, { wrapper: getAppWrapper() })

    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
    expect(screen.queryByText('custom-field-groups-[entity]-[id]:title')).not.toBeInTheDocument()
    expect(screen.queryByText('custom-field-groups-[entity]-[id]:subtitle')).not.toBeInTheDocument()
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })

  it('should display the form in a view mode', () => {
    useCustomFieldGroupsMock.mockReturnValue({
      getCustomFieldGroups: {
        data: {
          totalItems: 2,
        },
        isLoading: false,
      },
    })

    useCustomFieldGroupMock.mockReturnValue({
      getCustomFieldGroup: {
        data: { ...createCustomFieldGroupRequestDataMock, id: '23' },
        isLoading: false,
      },
      editCustomFieldGroup: {
        isLoading: false,
        mutateAsync: jest.fn(_data => Promise.resolve()),
      },
    })

    render(<CustomFieldGroup />, { wrapper: getAppWrapper() })

    const nameInput = screen.getByRole('textbox', {
      name: 'name',
    })

    expect(screen.queryByTestId('loading-component')).not.toBeInTheDocument()
    expect(screen.queryByText('custom-field-groups-[entity]-[id]:title')).toBeInTheDocument()
    expect(screen.queryByText('custom-field-groups-[entity]-[id]:subtitle')).toBeInTheDocument()
    expect(screen.queryByRole('form')).toBeInTheDocument()
    expect(nameInput).toBeInTheDocument()
    expect(nameInput).toBeDisabled()
  })

  it('should display the form in a edit mode', () => {
    useCustomFieldGroupsMock.mockReturnValue({
      getCustomFieldGroups: {
        data: {
          totalItems: 2,
        },
        isLoading: false,
      },
    })

    useCustomFieldGroupMock.mockReturnValue({
      getCustomFieldGroup: {
        data: { ...createCustomFieldGroupRequestDataMock, id: '23' },
        isLoading: false,
      },
      editCustomFieldGroup: {
        isLoading: false,
        mutateAsync: jest.fn(_data => Promise.resolve()),
      },
    })

    render(<CustomFieldGroup />, { wrapper: getAppWrapper() })

    const editButton = screen.getByText('common:buttons.edit')

    act(() => {
      fireEvent.click(editButton)
    })

    const nameInput = screen.queryByRole('textbox', { name: 'name' })
    const cancelButton = screen.queryByRole('button', { name: 'common:buttons.cancel' })
    const saveButton = screen.queryByRole('button', { name: 'common:buttons.save' })

    expect(cancelButton).toBeInTheDocument()
    expect(cancelButton).not.toBeDisabled()
    expect(saveButton).toBeInTheDocument()
    expect(saveButton).toBeDisabled()
    expect(screen.queryByTestId('loading-component')).not.toBeInTheDocument()
    expect(screen.queryByText('custom-field-groups-[entity]-[id]:title')).toBeInTheDocument()
    expect(screen.queryByText('custom-field-groups-[entity]-[id]:subtitle')).toBeInTheDocument()
    expect(screen.queryByRole('form')).toBeInTheDocument()
    expect(nameInput).toBeInTheDocument()
    expect(nameInput).not.toBeDisabled()
  })

  it('should handle successful submit the form', async () => {
    useCustomFieldGroupsMock.mockReturnValue({
      getCustomFieldGroups: {
        data: {
          totalItems: 2,
        },
        isLoading: false,
      },
    })

    useCustomFieldGroupMock.mockReturnValue({
      getCustomFieldGroup: {
        data: { ...createCustomFieldGroupRequestDataMock, id: '23' },
        isLoading: false,
      },
      editCustomFieldGroup: {
        isLoading: false,
        mutateAsync: jest.fn(_data => Promise.resolve()),
      },
    })

    render(<CustomFieldGroup />, { wrapper: getAppWrapper() })

    const editButton = screen.getByText('common:buttons.edit')

    act(() => {
      fireEvent.click(editButton)
    })

    const nameInput = screen.getByRole('textbox', { name: 'name' })
    const saveButton = screen.getByRole('button', { name: 'common:buttons.save' })

    act(() => {
      fireEvent.change(nameInput, {
        target: {
          value: 'updated',
        },
      })

      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(nameInput).toBeDisabled()
      expect(nameInput).toHaveValue('updated')
      expect(saveButton).not.toBeInTheDocument()
    })
  })

  it('should handle failed submit of the form', async () => {
    useCustomFieldGroupsMock.mockReturnValue({
      getCustomFieldGroups: {
        data: {
          totalItems: 2,
        },
        isLoading: false,
      },
    })

    useCustomFieldGroupMock.mockReturnValue({
      getCustomFieldGroup: {
        data: { ...createCustomFieldGroupRequestDataMock, id: '23' },
        isLoading: false,
      },
      editCustomFieldGroup: {
        isLoading: false,
        mutateAsync: jest.fn(() =>
          Promise.reject({
            body: {
              message: '',
            },
          })
        ),
      },
    })

    render(<CustomFieldGroup />, { wrapper: getAppWrapper() })

    const editButton = screen.getByText('common:buttons.edit')

    act(() => {
      fireEvent.click(editButton)
    })

    const nameInput = screen.getByRole('textbox', { name: 'name' })
    const saveButton = screen.getByRole('button', { name: 'common:buttons.save' })

    act(() => {
      fireEvent.change(nameInput, {
        target: {
          value: 'updated',
        },
      })

      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(nameInput).not.toBeDisabled()
      expect(nameInput).toHaveValue('updated')
      expect(saveButton).toBeInTheDocument()
      expect(screen.queryByText('common:notifications.error')).toBeInTheDocument()
    })
  })
})

it('should call unsaved changes related hook', () => {
  useCustomFieldGroupsMock.mockReturnValue({
    getCustomFieldGroups: {
      data: {
        totalItems: 2,
      },
      isLoading: false,
    },
  })

  useCustomFieldGroupMock.mockReturnValue({
    getCustomFieldGroup: {
      data: { ...createCustomFieldGroupRequestDataMock, id: '23' },
      isLoading: false,
    },
    editCustomFieldGroup: {
      isLoading: false,
      mutateAsync: jest.fn(_data => Promise.resolve()),
    },
  })

  render(<CustomFieldGroup />, { wrapper: getAppWrapper() })

  expect(useUnsavedChangesWarning).toBeCalled()
})
