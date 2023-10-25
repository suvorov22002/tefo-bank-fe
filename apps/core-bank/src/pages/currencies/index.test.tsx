import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'
import { Currency, CurrencyStatus, CurrencyUsageInBank } from '@/domains/currencies'
import { render, screen } from '@testing-library/react'

import Currencies from './index.page'
import { useCurrencies } from '../../domains/currencies/useCurrencies'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../domains/currencies/useCurrencies')
jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCurrenciesMock = useCurrencies as jest.MockedFunction<any>

const currencyMock: Currency = {
  id: '9',
  name: 'Chinese Yuan',
  alphabeticCode: 'CNY',
  numericCode: 156,
  symbol: '¥',
  numberOfDecimals: 2,
  usageInBank: [CurrencyUsageInBank.NonCash],
  status: CurrencyStatus.Active,
}

describe('Currencies page', () => {
  afterEach(() => {
    useCurrenciesMock.mockReset()
  })

  it('should show loading indicator while data is fetching', () => {
    useCurrenciesMock.mockReturnValueOnce({
      getCurrencies: {
        isLoading: true,
        data: undefined,
      },
    })

    render(<Currencies />, { wrapper: getAppWrapper() })

    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
    expect(screen.queryByText('currencies:title')).not.toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  it('should show the page with empty state if there is no created currency', () => {
    useCurrenciesMock.mockReturnValueOnce({
      getCurrencies: {
        isLoading: false,
        data: {
          data: [],
          page: 1,
          limit: 10,
          totalItems: 1,
        },
      },
    })

    render(<Currencies />, { wrapper: getAppWrapper() })
    const createButton = screen.queryByRole('button', { name: 'common:buttons.create' })

    expect(screen.queryByText('currencies:buttons.addNewCurrency')).not.toBeInTheDocument()
    expect(screen.queryByText('currencies:empty.noCurrencies')).toBeInTheDocument()
    expect(createButton).not.toBeDisabled()
  })

  it('should show the page content if there are created currency', () => {
    useCurrenciesMock.mockReturnValueOnce({
      getCurrencies: {
        isLoading: false,
        data: {
          data: [currencyMock],
          page: 1,
          limit: 10,
          totalItems: 1,
        },
      },
    })

    render(<Currencies />, { wrapper: getAppWrapper() })

    expect(screen.getByText('currencies:subtitle')).toBeInTheDocument()
    expect(screen.queryByText('currencies:buttons.addCurrency')).toBeInTheDocument()

    expect(screen.queryByRole('table')).toBeInTheDocument()
    expect(screen.queryByText(currencyMock.id)).not.toBeInTheDocument()
    expect(screen.queryByText(currencyMock.name)).toBeInTheDocument()
    expect(screen.queryByText(currencyMock.alphabeticCode)).toBeInTheDocument()
    expect(screen.queryByText(currencyMock.numericCode)).toBeInTheDocument()
    expect(screen.queryByText(currencyMock.symbol)).toBeInTheDocument()
    expect(screen.queryByText(currencyMock.numberOfDecimals)).toBeInTheDocument()
    expect(
      screen.queryByText('currencies:currenciesTable.currencyStatuses.active')
    ).toBeInTheDocument()
    expect(
      screen.queryByText('currencies:currenciesTable.currencyUsageInBank.nonCash')
    ).toBeInTheDocument()
  })
})
