import { render, screen } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { getBankUnitTypesResponseMock } from '@/domains/bankUnitTypes/api/mock'
import { i18nMock } from '@/_tests/mocks/i18n'

import BankUnitTypes from './index.page'
import { useBankUnitTypes } from '../../../domains/bankUnitTypes/useBankUnitTypes'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../domains/bankUnitTypes/useBankUnitTypes')
jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBankUnitTypesMock = useBankUnitTypes as jest.MockedFunction<any>

describe('BankUnitTypes page', () => {
  afterEach(() => {
    useBankUnitTypesMock.mockReset()
  })

  it('should show loading indicator while data is fetching', () => {
    useBankUnitTypesMock.mockReturnValueOnce({
      getBankUnitTypes: {
        isLoading: true,
        data: undefined,
      },
    })
    render(<BankUnitTypes />, { wrapper: getAppWrapper() })
    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
    expect(screen.queryByText('structure-bank-unit-types:title')).not.toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  it('should show the page with empty state if there is no created bankUnitTypes', () => {
    useBankUnitTypesMock.mockReturnValueOnce({
      getBankUnitTypes: {
        isLoading: false,
        data: {
          ...getBankUnitTypesResponseMock,
          data: [],
        },
      },
    })
    render(<BankUnitTypes />, { wrapper: getAppWrapper() })
    expect(screen.queryByText('structure-bank-unit-types:empty.noUnitTypes')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'common:buttons.create' })).toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  it('should show the page content if there are created bankUnitTypes', () => {
    useBankUnitTypesMock.mockReturnValueOnce({
      getBankUnitTypes: {
        isLoading: false,
        data: getBankUnitTypesResponseMock,
      },
    })
    render(<BankUnitTypes />, { wrapper: getAppWrapper() })

    expect(screen.getByText('structure-bank-unit-types:title')).toBeInTheDocument()
    expect(screen.getByText('structure-bank-unit-types:buttons.addNewUnitType')).toBeInTheDocument()
    expect(screen.queryByRole('table')).toBeInTheDocument()
    expect(screen.queryByText(getBankUnitTypesResponseMock.data[0].name)).toBeInTheDocument()
    expect(screen.queryAllByRole('checkbox', { name: 'isVisible' })[0]).toBeDisabled()
    expect(
      screen.queryAllByText(
        'structure-bank-unit-types:bankUnitTypesTable.unitTypeStatuses.active'
      )[0]
    ).toBeInTheDocument()
  })
})
