import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'
import { useAllCurrencies } from '@/domains/currencies/useAllCurrencies'
import { useCurrency } from '@/domains/currencies/useCurrency'
import { useUnsavedChangesWarning } from 'ui'
import userEvent from '@testing-library/user-event'

import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import CreateCurrency from './index.page'
import { CurrencyUsageInBank } from '@/domains/currencies'

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

describe('CreateCurrency page', () => {
  afterEach(() => {
    useCurrencyMock.mockReset()
    useAllCurrenciesMock.mockReset()
  })

  it('should show loading indicator while data is fetching', () => {
    useCurrencyMock.mockReturnValue({
      createCurrency: {
        isLoading: false,
        mutateAsync: jest.fn((data: Record<string, unknown>) => Promise.resolve(data)),
      },
    })
    useAllCurrenciesMock.mockReturnValue({
      getAllCurrencies: {
        isLoading: true,
        data: undefined,
      },
    })

    render(<CreateCurrency />, { wrapper: getAppWrapper() })

    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
  })

  it('should show the page content', () => {
    useCurrencyMock.mockReturnValue({
      createCurrency: {
        isLoading: false,
        mutateAsync: jest.fn((data: Record<string, unknown>) => Promise.resolve(data)),
      },
    })
    useAllCurrenciesMock.mockReturnValue({
      getAllCurrencies: {
        isLoading: false,
        data: [],
      },
    })

    render(<CreateCurrency />, { wrapper: getAppWrapper() })

    expect(screen.queryByTestId('loading-component')).not.toBeInTheDocument()
  })

  it('should handle successful submit of the form', async () => {
    useCurrencyMock.mockReturnValue({
      createCurrency: {
        isLoading: false,
        mutateAsync: jest.fn((data: Record<string, unknown>) => Promise.resolve(data)),
      },
    })
    useAllCurrenciesMock.mockReturnValue({
      getAllCurrencies: {
        isLoading: false,
        data: [],
      },
    })

    render(<CreateCurrency />, { wrapper: getAppWrapper() })

    const nameInput = screen.getByRole('textbox', { name: 'name' })

    const alphabeticCodeInput = screen.getByRole('textbox', { name: 'alphabeticCode' })
    const numericCodeInput = screen.getByRole('textbox', { name: 'numericCode' })
    const symbolInput = screen.getByRole('textbox', { name: 'symbol' })
    const numberOfDecimalsInput = screen.getByRole('spinbutton', { name: 'numberOfDecimals' })

    act(() => {
      fireEvent.change(nameInput, {
        target: {
          value: 'New Currency',
        },
      })

      fireEvent.change(alphabeticCodeInput, {
        target: {
          value: 'FLY',
        },
      })

      fireEvent.change(numericCodeInput, {
        target: {
          value: '003',
        },
      })

      fireEvent.change(symbolInput, {
        target: {
          value: '$',
        },
      })

      fireEvent.change(numberOfDecimalsInput, {
        target: {
          value: '5',
        },
      })
    })

    const nonCashCheckbox = screen.getByRole('checkbox', { name: CurrencyUsageInBank.NonCash })
    const cashCheckbox = screen.getByRole('checkbox', { name: CurrencyUsageInBank.Cash })
    const legalTenderCheckbox = screen.getByRole('checkbox', {
      name: CurrencyUsageInBank.LegalTender,
    })
    const referenceCheckbox = screen.getByRole('checkbox', {
      name: CurrencyUsageInBank.Reference,
    })

    act(() => {
      userEvent.click(nonCashCheckbox)
    })

    act(() => {
      userEvent.click(cashCheckbox)
    })

    act(() => {
      userEvent.click(legalTenderCheckbox)
    })

    act(() => {
      userEvent.click(referenceCheckbox)
    })

    const createButton = screen.getByRole('button', {
      name: 'common:buttons.create',
    })

    act(() => {
      fireEvent.click(createButton)
    })

    await waitFor(() => {
      expect(
        screen.queryByText('currencies-create:popconfirms.referenceCanBeSetOnceTitle')
      ).toBeVisible()
      expect(
        screen.queryByText('currencies-create:popconfirms.referenceCanBeSetOnceDescription')
      ).toBeVisible()
      expect(screen.queryByText('common:buttons.yes')).toBeVisible()
      expect(screen.queryByText('common:buttons.no')).toBeVisible()
    })

    const yesButton = screen.queryByText('common:buttons.yes')

    act(() => {
      userEvent.click(yesButton as HTMLElement)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.success')).toBeInTheDocument()
    })
  })

  it('should handle failed submit of the form', async () => {
    useCurrencyMock.mockReturnValue({
      createCurrency: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) =>
          Promise.reject({ body: { message: '' } })
        ),
      },
    })
    useAllCurrenciesMock.mockReturnValue({
      getAllCurrencies: {
        isLoading: false,
        data: [],
      },
    })

    render(<CreateCurrency />, { wrapper: getAppWrapper() })

    const nameInput = screen.getByRole('textbox', { name: 'name' })
    const alphabeticCodeInput = screen.getByRole('textbox', { name: 'alphabeticCode' })
    const numericCodeInput = screen.getByRole('textbox', { name: 'numericCode' })
    const symbolInput = screen.getByRole('textbox', { name: 'symbol' })
    const numberOfDecimalsInput = screen.getByRole('spinbutton', { name: 'numberOfDecimals' })

    const createButton = screen.getByRole('button', {
      name: 'common:buttons.create',
    })

    act(() => {
      fireEvent.change(nameInput, {
        target: {
          value: 'New Currency',
        },
      })

      fireEvent.change(alphabeticCodeInput, {
        target: {
          value: 'FLY',
        },
      })

      fireEvent.change(numericCodeInput, {
        target: {
          value: '003',
        },
      })

      fireEvent.change(symbolInput, {
        target: {
          value: '$',
        },
      })

      fireEvent.change(numberOfDecimalsInput, {
        target: {
          value: '5',
        },
      })

      fireEvent.click(createButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.success')).not.toBeInTheDocument()
      expect(screen.queryByText('common:notifications.error')).toBeInTheDocument()
      expect(nameInput).not.toBeDisabled()
      expect(nameInput).toHaveValue('New Currency')
      expect(createButton).toBeInTheDocument()
      expect(createButton).not.toBeDisabled()
    })
  })

  it('should have unsaved changes handling', () => {
    useCurrencyMock.mockReturnValue({
      createCurrency: {
        isLoading: false,
        mutateAsync: jest.fn((data: Record<string, unknown>) => Promise.resolve(data)),
      },
    })
    useAllCurrenciesMock.mockReturnValue({
      getAllCurrencies: {
        isLoading: false,
        data: [],
      },
    })

    render(<CreateCurrency />, { wrapper: getAppWrapper() })

    expect(useUnsavedChangesWarning).toBeCalled()
  })
})
