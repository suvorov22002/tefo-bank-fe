import { render, screen } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'
import { CustomerListItem, CustomerStatuses, CustomerTypes } from '@/domains/customers'

import Customers from './index.page'
import { useCustomers } from '../../domains/customers/useCustomers'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../domains/customers/useCustomers')
jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCustomersMock = useCustomers as jest.MockedFunction<any>

const customerListItemMock: CustomerListItem = {
  residency: true,
  createdAt: '2023-08-16T14:52:09.399Z',
  updatedBy: 'Someone 2',
  code: 12,
  unitName: 'unit 2',
  id: 2,
  shortName: 'name name',
  updatedAt: '2023-08-16T14:52:09.399Z',
  relationshipManagerName: 'John Does',
  status: CustomerStatuses.Inactive,
  type: CustomerTypes.NaturalPerson,
}

describe('Customers page', () => {
  afterEach(() => {
    useCustomersMock.mockReset()
  })

  it('should show loading indicator while data is fetching', () => {
    useCustomersMock.mockReturnValueOnce({
      getCustomers: {
        isLoading: true,
        data: undefined,
      },
    })

    render(<Customers />, { wrapper: getAppWrapper() })

    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
    expect(screen.queryByText('customers:title')).not.toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  it('should show the page with empty state if there is no created customers', () => {
    useCustomersMock.mockReturnValueOnce({
      getCustomers: {
        isLoading: false,
        data: {
          data: [],
          page: 1,
          limit: 10,
          totalItems: 1,
        },
      },
    })

    render(<Customers />, { wrapper: getAppWrapper() })

    const createButton = screen.queryByRole('button', { name: 'common:buttons.create' })

    expect(screen.queryByText('customers:title')).toBeInTheDocument()
    expect(screen.queryByText('customers:buttons.addNewCustomer')).not.toBeInTheDocument()
    expect(screen.queryByText('customers:empty.noCustomers')).toBeInTheDocument()
    expect(createButton).not.toBeDisabled()
  })

  it('should show the page content if there are created customers', () => {
    useCustomersMock.mockReturnValueOnce({
      getCustomers: {
        isLoading: false,
        data: {
          data: [customerListItemMock],
          page: 1,
          limit: 10,
          totalItems: 1,
        },
      },
    })

    render(<Customers />, { wrapper: getAppWrapper() })

    expect(screen.getByText('customers:subtitle')).toBeInTheDocument()
    expect(screen.queryByText('customers:buttons.addNewCustomer')).toBeInTheDocument()

    expect(screen.queryByRole('table')).toBeInTheDocument()
    expect(screen.queryByText(customerListItemMock.code)).toBeInTheDocument()
    expect(screen.queryByText(customerListItemMock.shortName)).toBeInTheDocument()
    expect(screen.queryByText(customerListItemMock.unitName)).toBeInTheDocument()
    expect(screen.queryByText(customerListItemMock.relationshipManagerName)).toBeInTheDocument()
    expect(screen.queryByText(customerListItemMock.updatedBy)).toBeInTheDocument()
    expect(
      screen.queryByText('customers:customersTable.customerStatuses.inactive')
    ).toBeInTheDocument()
  })
})
