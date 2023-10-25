import { render, screen } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { getBankUnitsResponseMock } from '@/domains/bankUnits/api/mock'
import { i18nMock } from '@/_tests/mocks/i18n'
import { BankUnit, BankUnitStatus } from '@/domains/bankUnits'

import BankUnits from './index.page'
import { getBankUnitTypesResponseMock } from '../../../domains/bankUnitTypes/api/mock'
import { useBankUnitTypes } from '../../../domains/bankUnitTypes'
import { useBankUnits } from '../../../domains/bankUnits/useBankUnits'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../domains/bankUnits/useBankUnits')
jest.mock('../../../domains/bankUnitTypes/useBankUnitTypes')
jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBankUnitsMock = useBankUnits as jest.MockedFunction<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBankUnitTypesMock = useBankUnitTypes as jest.MockedFunction<any>

const bankUnitMock: BankUnit = {
  id: '789',
  unitTypeId: 'unitType',
  unitTypeName: 'unitType',
  parentId: 'parent',
  parentName: 'parent',
  code: 'unitCode1',
  name: 'name',
  streetLine: 'streetLine',
  city: 'city',
  region: 'region',
  zipCode: 'zipCode',
  phoneCode: '+380',
  shortPhoneNumber: '1234555',
  email: 'email@email.com',
  isDataRestricted: true,
  status: BankUnitStatus.INACTIVE,
}

describe('BankUnits page', () => {
  afterEach(() => {
    useBankUnitsMock.mockReset()
    useBankUnitTypesMock.mockReset()
  })

  it('should show loading indicator while data is fetching', () => {
    useBankUnitsMock.mockReturnValue({
      getBankUnits: {
        isLoading: true,
        data: undefined,
      },
    })
    useBankUnitTypesMock.mockReturnValue({
      getBankUnitTypes: {
        isLoading: true,
        data: undefined,
      },
    })
    render(<BankUnits />, { wrapper: getAppWrapper() })
    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
    expect(screen.queryByText('structure-bank-units:title')).not.toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  it('should show the page with empty state if there is no created bankUnitTypes', () => {
    useBankUnitsMock.mockReturnValue({
      getBankUnits: {
        isLoading: false,
        data: {
          ...getBankUnitsResponseMock,
          data: [],
        },
      },
    })
    useBankUnitTypesMock.mockReturnValue({
      getBankUnitTypes: {
        isLoading: false,
        data: {
          ...getBankUnitTypesResponseMock,
          data: [],
        },
      },
    })

    render(<BankUnits />, { wrapper: getAppWrapper() })

    const createButton = screen.queryByRole('button', { name: 'common:buttons.create' })

    expect(screen.queryByText('structure-bank-units:title')).not.toBeInTheDocument()
    expect(screen.queryByText('structure-bank-units:buttons.addNewUnit')).not.toBeInTheDocument()
    expect(screen.queryByText('structure-bank-units:empty.noUnitTypes')).toBeInTheDocument()
    expect(createButton).toBeDisabled()
  })

  it('should show the page with empty state if there is no created bankUnits', () => {
    useBankUnitsMock.mockReturnValue({
      getBankUnits: {
        isLoading: false,
        data: {
          ...getBankUnitsResponseMock,
          data: [],
        },
      },
    })
    useBankUnitTypesMock.mockReturnValue({
      getBankUnitTypes: {
        isLoading: false,
        data: getBankUnitTypesResponseMock,
      },
    })

    render(<BankUnits />, { wrapper: getAppWrapper() })

    const createButton = screen.queryByRole('button', { name: 'common:buttons.create' })

    expect(screen.queryByText('structure-bank-units:title')).not.toBeInTheDocument()
    expect(screen.queryByText('structure-bank-units:buttons.addNewUnit')).not.toBeInTheDocument()
    expect(screen.queryByText('structure-bank-units:empty.noUnits')).toBeInTheDocument()
    expect(createButton).not.toBeDisabled()
  })

  it('should show the page content if there are created bankUnits', () => {
    useBankUnitsMock.mockReturnValue({
      getBankUnits: {
        isLoading: false,
        data: {
          ...getBankUnitsResponseMock,
          data: [bankUnitMock],
        },
      },
    })
    useBankUnitTypesMock.mockReturnValue({
      getBankUnitTypes: {
        isLoading: false,
        data: getBankUnitTypesResponseMock,
      },
    })

    render(<BankUnits />, { wrapper: getAppWrapper() })

    expect(screen.getByText('structure-bank-units:title')).toBeInTheDocument()
    expect(screen.queryByText('structure-bank-units:buttons.addNewUnit')).toBeInTheDocument()
    expect(screen.queryByRole('table')).toBeInTheDocument()
    expect(screen.queryByText(bankUnitMock.name)).toBeInTheDocument()
    expect(screen.queryByText(bankUnitMock.code)).toBeInTheDocument()
    expect(screen.queryByText(bankUnitMock.unitTypeName)).toBeInTheDocument()
    expect(screen.queryByText(bankUnitMock.parentName)).toBeInTheDocument()
    expect(screen.queryByText(bankUnitMock.streetLine)).toBeInTheDocument()
    expect(screen.queryByText(bankUnitMock.city)).toBeInTheDocument()
    expect(screen.queryByText(bankUnitMock.region)).toBeInTheDocument()
    expect(screen.queryByText(bankUnitMock.zipCode)).toBeInTheDocument()
    expect(
      screen.queryByText(bankUnitMock.phoneCode + bankUnitMock.shortPhoneNumber)
    ).toBeInTheDocument()
    expect(screen.queryByText(bankUnitMock.email)).toBeInTheDocument()
    expect(screen.queryByRole('checkbox', { name: 'isDataRestricted' })).toBeDisabled()
    expect(
      screen.queryByText('structure-bank-units:bankUnitsTable.unitStatuses.inactive')
    ).toBeInTheDocument()
  })
})
