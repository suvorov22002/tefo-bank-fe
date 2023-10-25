import { useUnsavedChangesWarning } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'
import { Dictionary, DictionaryStatuses, DictionaryTypes } from '@/domains/dictionaries'

import CreateDictionaryValue from './index.page'
import { useDictionary } from '../../../../domains/dictionaries/useDictionary'
import { useDictionaryValue } from '../../../../domains/dictionaries/useDictionaryValue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDictionaryValueMock = useDictionaryValue as jest.MockedFunction<any>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDictionaryMock = useDictionary as jest.MockedFunction<any>

jest.mock('next-i18next', () => i18nMock)
jest.mock('../../../../domains/dictionaries/useDictionary')
jest.mock('../../../../domains/dictionaries/useDictionaryValue')
jest.mock('next/router', () => require('next-router-mock'))

jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
  useUnsavedChangesWarning: jest.fn(),
}))

const mockDictionary: Dictionary = {
  name: 'country',
  id: '1',
  templateId: 't1',
  type: DictionaryTypes.System,
  status: DictionaryStatuses.Active,
  code: 'country_1',
}

describe('Create dictionary value page', () => {
  afterEach(() => {
    useDictionaryMock.mockReset()
  })

  it('should show loading indicator while data is fetching', () => {
    useDictionaryMock.mockReturnValue({
      getDictionary: {
        data: undefined,
        isLoading: true,
      },
    })

    useDictionaryValueMock.mockReturnValue({
      createDictionaryValueAction: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) => Promise.resolve()),
      },
    })

    render(<CreateDictionaryValue />)

    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
    expect(
      screen.queryByText('dictionaries-[dictionaryId]-add-value:subtitle')
    ).not.toBeInTheDocument()
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })

  it('should render page content if dictionary with given id exist', () => {
    useDictionaryMock.mockReturnValue({
      getDictionary: {
        data: mockDictionary,
        isLoading: false,
      },
    })

    useDictionaryValueMock.mockReturnValue({
      createDictionaryValueAction: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) => Promise.resolve()),
      },
    })

    render(<CreateDictionaryValue />)

    expect(screen.queryByTestId('loading-component')).not.toBeInTheDocument()
    expect(screen.getByText('dictionaries-[dictionaryId]-add-value:subtitle')).toBeInTheDocument()
    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', {
        name: 'name',
      })
    ).toBeInTheDocument()
  })

  it('should handle success submit of the form', async () => {
    useDictionaryMock.mockReturnValue({
      getDictionary: {
        data: mockDictionary,
        isLoading: false,
      },
    })

    useDictionaryValueMock.mockReturnValue({
      createDictionaryValueAction: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) => Promise.resolve()),
      },
    })

    render(<CreateDictionaryValue />, { wrapper: getAppWrapper() })

    const nameInput = screen.getByRole('textbox', { name: 'name' })
    const codeInput = screen.getByRole('textbox', { name: 'code' })
    const statusSelect = screen.getByRole('combobox', { name: 'status' })

    const createDictionaryValueButton = screen.getByRole('button', {
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

      fireEvent.click(createDictionaryValueButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.success')).toBeInTheDocument()
    })
  })

  it('should handle failed submit of the form', async () => {
    useDictionaryMock.mockReturnValue({
      getDictionary: {
        data: mockDictionary,
        isLoading: false,
      },
    })
    useDictionaryValueMock.mockReturnValue({
      createDictionaryValueAction: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) =>
          Promise.reject({
            body: {
              message: '',
            },
          })
        ),
      },
    })

    render(<CreateDictionaryValue />, { wrapper: getAppWrapper() })

    const input = screen.getByRole('textbox', { name: 'name' })
    const codeInput = screen.getByRole('textbox', { name: 'code' })
    const statusSelect = screen.getByRole('combobox', { name: 'status' })

    const createDictionaryValueButton = screen.getByRole('button', {
      name: 'common:buttons.saveChanges',
    })

    act(() => {
      fireEvent.change(input, {
        target: {
          value: 'Test Dictionary Value Name',
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

      fireEvent.click(createDictionaryValueButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.error')).toBeInTheDocument()
    })
  })

  it('should have unsaved changes handling', async () => {
    useDictionaryMock.mockReturnValue({
      getDictionary: {
        data: mockDictionary,
        isLoading: false,
      },
    })
    useDictionaryValueMock.mockReturnValue({
      createDictionaryValueAction: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) => Promise.reject()),
      },
    })

    render(<CreateDictionaryValue />, { wrapper: getAppWrapper() })

    expect(useUnsavedChangesWarning).toBeCalled()
  })
})
