import { useUnsavedChangesWarning } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { editDictionaryValueMock } from '@/domains/dictionaries/api/mocks'
import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'
import { Dictionary, DictionaryStatuses, DictionaryTypes } from '@/domains/dictionaries'

import DictionaryValue from './index.page'
import { useDictionary } from '../../../../domains/dictionaries/useDictionary'
import { useDictionaryValue } from '../../../../domains/dictionaries/useDictionaryValue'

jest.mock('next-i18next', () => i18nMock)
jest.mock('../../../../domains/dictionaries/useDictionary')
jest.mock('../../../../domains/dictionaries/useDictionaryValue')
jest.mock('next/router', () => require('next-router-mock'))

jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
  useUnsavedChangesWarning: jest.fn(),
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDictionaryValueMock = useDictionaryValue as jest.MockedFunction<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDictionaryMock = useDictionary as jest.MockedFunction<any>

describe('Edit dictionary value', () => {
  const mockDictionary: Dictionary = {
    name: 'country',
    id: '1',
    templateId: 't1',
    type: DictionaryTypes.System,
    status: DictionaryStatuses.Active,
    code: 'country_1',
  }

  const mockDictionaryValue = editDictionaryValueMock

  afterEach(() => {
    useDictionaryMock.mockReset()
    useDictionaryValueMock.mockReset()
  })

  it('should show loading indicator while data is fetching', () => {
    useDictionaryMock.mockReturnValue({
      getDictionary: {
        data: undefined,
        isLoading: true,
      },
    })

    useDictionaryValueMock.mockReturnValue({
      getDictionaryValue: {
        data: undefined,
        isLoading: true,
      },
    })

    render(<DictionaryValue />)

    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
    expect(
      screen.queryByText('dictionaries-[dictionaryId]-[valueId]-edit:subtitle')
    ).not.toBeInTheDocument()
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })

  it('should render page content if dictionary and dictionary value with given ids exist', () => {
    useDictionaryMock.mockReturnValue({
      getDictionary: {
        data: mockDictionary,
        isLoading: false,
      },
    })

    useDictionaryValueMock.mockReturnValue({
      getDictionaryValue: {
        data: mockDictionaryValue,
        isLoading: false,
      },
      editDictionaryValue: {
        mutateAsync: () => Promise.resolve(),
      },
    })

    render(<DictionaryValue />)

    expect(screen.queryByTestId('loading-component')).not.toBeInTheDocument()
    expect(
      screen.queryByText('dictionaries-[dictionaryId]-[valueId]-edit:subtitle')
    ).toBeInTheDocument()
    expect(screen.getByRole('form')).toBeInTheDocument()
  })

  it('should handle submit success', async () => {
    useDictionaryMock.mockReturnValue({
      getDictionary: {
        data: mockDictionary,
        isLoading: false,
      },
    })

    useDictionaryValueMock.mockReturnValue({
      getDictionaryValue: {
        data: mockDictionaryValue,
        isLoading: false,
      },
      editDictionaryValue: {
        mutateAsync: () => Promise.resolve(),
      },
    })

    render(<DictionaryValue />, { wrapper: getAppWrapper() })

    const editDictionaryValueButton = screen.getByText('common:buttons.edit')

    act(() => {
      fireEvent.click(editDictionaryValueButton)
    })

    const nameInput = screen.getByRole('textbox', { name: 'name' })
    const codeInput = screen.getByRole('textbox', { name: 'code' })
    const statusSelect = screen.getByRole('combobox', { name: 'status' })

    const saveChangesButton = screen.getByRole('button', {
      name: 'common:buttons.saveChanges',
    })

    act(() => {
      fireEvent.change(nameInput, {
        target: {
          value: 'test Dictionary Value name',
        },
      })
      fireEvent.change(codeInput, {
        target: {
          value: 'test Dictionary Value code',
        },
      })
      fireEvent.change(statusSelect, {
        target: {
          value: DictionaryStatuses.Inactive,
        },
      })

      fireEvent.click(saveChangesButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.success')).toBeInTheDocument()
    })
  })

  it('should handle submit fail', async () => {
    useDictionaryMock.mockReturnValue({
      getDictionary: {
        data: mockDictionary,
        isLoading: false,
      },
    })

    useDictionaryValueMock.mockReturnValue({
      getDictionaryValue: {
        data: mockDictionaryValue,
        isLoading: false,
      },
      editDictionaryValue: {
        mutateAsync: () =>
          Promise.reject({
            body: {
              message: '',
            },
          }),
      },
    })

    render(<DictionaryValue />, { wrapper: getAppWrapper() })

    const editDictionaryValueButton = screen.getByText('common:buttons.edit')

    act(() => {
      fireEvent.click(editDictionaryValueButton)
    })

    const nameInput = screen.getByRole('textbox', { name: 'name' })
    const codeInput = screen.getByRole('textbox', { name: 'code' })
    const statusSelect = screen.getByRole('combobox', { name: 'status' })

    const saveChangesButton = screen.getByRole('button', {
      name: 'common:buttons.saveChanges',
    })

    act(() => {
      fireEvent.change(nameInput, {
        target: {
          value: 'test Dictionary Value name',
        },
      })
      fireEvent.change(codeInput, {
        target: {
          value: 'test Dictionary Value code',
        },
      })
      fireEvent.change(statusSelect, {
        target: {
          value: DictionaryStatuses.Inactive,
        },
      })

      fireEvent.click(saveChangesButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.error')).toBeInTheDocument()
    })
  })

  it('should have unsaved changes handling', async () => {
    useDictionaryMock.mockReturnValue({
      getDictionary: {
        data: undefined,
        isLoading: true,
      },
    })
    useDictionaryValueMock.mockReturnValue({
      getDictionaryValue: {
        data: mockDictionaryValue,
        isLoading: false,
      },
      editDictionaryValue: {
        mutateAsync: () => Promise.reject(),
      },
    })

    render(<DictionaryValue />, { wrapper: getAppWrapper() })

    expect(useUnsavedChangesWarning).toBeCalled()
  })
})
