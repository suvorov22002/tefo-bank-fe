import { render, screen } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'
import { Country, CountryStatus } from '@/domains/countries'

import Countries from './index.page'
import { useCountries } from '../../domains/countries/useCountries'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../domains/countries/useCountries')
jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCountriesMock = useCountries as jest.MockedFunction<any>

const countryMock: Country = {
  id: 1,
  shortName: 'Ctr1',
  name: 'Country1',
  phoneCode: '+333',
  phoneLengthMin: 7,
  phoneLengthMax: 9,
  status: CountryStatus.ACTIVE,
  createdAt: '2023-08-16T14:52:09.399Z',
  updatedAt: '2023-08-16T14:52:09.399Z',
  updatedBy: 'Someone',
  ISOAlpha3Code: 'CT1',
  ISOAlpha2Code: 'C1',
  ISONumericCode: '3479780',
}

describe('Countries page', () => {
  afterEach(() => {
    useCountriesMock.mockReset()
  })

  it('should show loading indicator while data is fetching', () => {
    useCountriesMock.mockReturnValueOnce({
      getCountries: {
        isLoading: true,
        data: undefined,
      },
    })

    render(<Countries />, { wrapper: getAppWrapper() })

    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
    expect(screen.queryByText('countries:title')).not.toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  it('should show the page with empty state if there is no created countries', () => {
    useCountriesMock.mockReturnValueOnce({
      getCountries: {
        isLoading: false,
        data: {
          data: [],
          page: 1,
          limit: 10,
          totalItems: 1,
        },
      },
    })

    render(<Countries />, { wrapper: getAppWrapper() })

    const createButton = screen.queryByRole('button', { name: 'common:buttons.create' })

    expect(screen.queryByText('countries:title')).toBeInTheDocument()
    expect(screen.queryByText('countries:buttons.addNewCountry')).not.toBeInTheDocument()
    expect(screen.queryByText('countries:empty.noCountries')).toBeInTheDocument()
    expect(createButton).not.toBeDisabled()
  })

  it('should show the page content if there are created countries', () => {
    useCountriesMock.mockReturnValueOnce({
      getCountries: {
        isLoading: false,
        data: {
          data: [countryMock],
          page: 1,
          limit: 10,
          totalItems: 1,
        },
      },
    })

    render(<Countries />, { wrapper: getAppWrapper() })

    expect(screen.getByText('countries:subtitle')).toBeInTheDocument()
    expect(screen.queryByText('countries:buttons.addNewCountry')).toBeInTheDocument()

    expect(screen.queryByRole('table')).toBeInTheDocument()
    expect(screen.queryByText(countryMock.shortName)).toBeInTheDocument()
    expect(screen.queryByText(countryMock.name)).toBeInTheDocument()
    expect(screen.queryByText(countryMock.ISOAlpha3Code)).toBeInTheDocument()
    expect(screen.queryByText(countryMock.ISOAlpha2Code)).toBeInTheDocument()
    expect(screen.queryByText(countryMock.ISONumericCode)).toBeInTheDocument()
    expect(screen.queryByText(countryMock.phoneCode)).toBeInTheDocument()
    expect(
      screen.queryByText('countries:countriesTable.countryStatuses.active')
    ).toBeInTheDocument()
  })
})
