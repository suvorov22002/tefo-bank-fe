import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { useUnsavedChangesWarning } from 'ui'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'
import { useAllCurrencies, useCurrency } from '@/domains/currencies'

import CurrencyDetails from './index.page'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../domains/currencies/useCurrency')
jest.mock('../../../domains/currencies/useAllCurrencies')
jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
  useUnsavedChangesWarning: jest.fn(),
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCurrencyMock = useCurrency as jest.MockedFunction<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useAllCurrenciesMock = useAllCurrencies as jest.MockedFunction<any>

describe('CurrencyDetails', () => {
  afterEach(() => {
    useCurrencyMock.mockReset()
    useAllCurrenciesMock.mockReset()
  })

  it('should show loading indicator while data is loading', () => {
    useCurrencyMock.mockReturnValue({
      getCurrency: {
        data: undefined,
        isLoading: true,
      },
      editCurrency: {
        isLoading: false,
        mutateAsync: jest.fn(_data => Promise.resolve()),
      },
    })

    useAllCurrenciesMock.mockReturnValue({
      getAllCurrencies: {
        data: undefined,
        isLoading: true,
      },
    })

    render(<CurrencyDetails />, { wrapper: getAppWrapper() })

    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
    expect(screen.queryByText('currencies:title')).not.toBeInTheDocument()
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })

  it('should display the form in view mode', () => {
    useCurrencyMock.mockReturnValue({
      getCurrency: {
        data: {
          id: '1',
          name: 'USD',
          alphabeticCode: 'USD',
          numericCode: '840',
          status: 'Active',
          usageInBank: [],
        },
        isLoading: false,
      },
      editCurrency: {
        isLoading: false,
        mutateAsync: jest.fn(_data => Promise.resolve()),
      },
    })

    useAllCurrenciesMock.mockReturnValue({
      getAllCurrencies: {
        data: [],
        isLoading: false,
      },
    })

    render(<CurrencyDetails />, { wrapper: getAppWrapper() })

    const nameInput = screen.getByRole('textbox', {
      name: 'name',
    })

    expect(screen.queryByTestId('loading-component')).not.toBeInTheDocument()
    expect(screen.queryByText('currencies:title')).toBeInTheDocument()
    expect(screen.queryByRole('form')).toBeInTheDocument()
    expect(nameInput).toBeInTheDocument()
    expect(nameInput).toBeDisabled()
  })

  it('should display the form in edit mode', () => {
    useCurrencyMock.mockReturnValue({
      getCurrency: {
        data: {
          id: '1',
          name: 'USD',
          alphabeticCode: 'USD',
          numericCode: '840',
          status: 'Active',
          usageInBank: [],
        },
        isLoading: false,
      },
      editCurrency: {
        isLoading: false,
        mutateAsync: jest.fn(_data => Promise.resolve()),
      },
    })

    useAllCurrenciesMock.mockReturnValue({
      getAllCurrencies: {
        data: [],
        isLoading: false,
      },
    })

    render(<CurrencyDetails />, { wrapper: getAppWrapper() })

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
    expect(screen.queryByText('currencies:title')).toBeInTheDocument()
    expect(screen.queryByRole('form')).toBeInTheDocument()
    expect(nameInput).toBeInTheDocument()
    expect(nameInput).not.toBeDisabled()
  })

  it('should handle successful submit of the form', async () => {
    useCurrencyMock.mockReturnValue({
      getCurrency: {
        data: {
          id: '1',
          name: 'USD',
          alphabeticCode: 'USD',
          numericCode: '840',
          numberOfDecimals: '3',
          status: 'Active',
          usageInBank: [],
        },
        isLoading: false,
      },
      editCurrency: {
        isLoading: false,
        mutateAsync: jest.fn(_data => Promise.resolve()),
      },
    })
    useAllCurrenciesMock.mockReturnValue({
      getAllCurrencies: {
        data: [],
        isLoading: false,
      },
    })

    render(<CurrencyDetails />, { wrapper: getAppWrapper() })

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
      expect(screen.queryByText('common:notifications.success')).toBeInTheDocument()
    })
  })

  it('should handle failed submit of the form', async () => {
    useCurrencyMock.mockReturnValue({
      getCurrency: {
        data: {
          id: '1',
          name: 'USD',
          alphabeticCode: 'USD',
          numericCode: '840',
          numberOfDecimals: '3',
          status: 'Active',
          usageInBank: [],
        },
        isLoading: false,
      },
      editCurrency: {
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

    useAllCurrenciesMock.mockReturnValue({
      getAllCurrencies: {
        data: [],
        isLoading: false,
      },
    })

    render(<CurrencyDetails />, { wrapper: getAppWrapper() })

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
      expect(screen.queryByText('common:notifications.error')).toBeInTheDocument()
    })
  })

  it('should call the unsaved changes related hook', () => {
    useCurrencyMock.mockReturnValue({
      getCurrency: {
        data: {
          id: '1',
          name: 'USD',
          alphabeticCode: 'USD',
          numericCode: '840',
          status: 'Active',
          usageInBank: [],
        },
        isLoading: false,
      },
      editCurrency: {
        isLoading: false,
        mutateAsync: jest.fn(_data => Promise.resolve()),
      },
    })

    useAllCurrenciesMock.mockReturnValue({
      getAllCurrencies: {
        data: [],
        isLoading: false,
      },
    })

    render(<CurrencyDetails />, { wrapper: getAppWrapper() })

    expect(useUnsavedChangesWarning).toHaveBeenCalledWith(true)
  })
})
