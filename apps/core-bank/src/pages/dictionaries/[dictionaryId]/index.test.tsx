import { render, screen } from '@testing-library/react'

import { getDictionaryValuesMock } from '@/domains/dictionaries/api/mocks'
import { i18nMock } from '@/_tests/mocks/i18n'
import { Dictionary, DictionaryStatuses, DictionaryTypes } from '@/domains/dictionaries'

import DictionaryValues from './index.page'
import { DictionaryValuesTable } from '../components/tables'
import { useDictionary } from '../../../domains/dictionaries/useDictionary'
import { useDictionaryValues } from '../../../domains/dictionaries/useDictionaryValues'

jest.mock('next-i18next', () => i18nMock)
jest.mock('../../../domains/dictionaries/useDictionary')
jest.mock('../../../domains/dictionaries/useDictionaryValues')
jest.mock('next/router', () => require('next-router-mock'))

jest.mock('../components/tables', () => ({
  DictionaryValuesTable: jest.fn(() => <div data-testid="dictionaryValuesTable" />),
}))

jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDictionaryMock = useDictionary as jest.MockedFunction<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDictionaryValuesMock = useDictionaryValues as jest.MockedFunction<any>

describe('Dictionary page', () => {
  const mockDictionary: Dictionary = {
    name: 'country',
    id: 1,
    type: DictionaryTypes.User,
    status: DictionaryStatuses.Active,
    code: 'country_1',
  }

  const dictionaryValuesMock = getDictionaryValuesMock('1')

  const dictionaryValuesMockResponse = {
    data: getDictionaryValuesMock('1').slice(0, 10),
    page: 1,
    limit: 10,
    totalItems: dictionaryValuesMock.length,
  }

  afterEach(() => {
    useDictionaryMock.mockReset()
    useDictionaryValuesMock.mockReset()
  })

  it('should show loading indicator while data is fetching', () => {
    useDictionaryMock.mockReturnValue({
      getDictionary: {
        data: undefined,
        isLoading: true,
      },
    })

    useDictionaryValuesMock.mockReturnValue({
      getDictionaryValues: {
        data: undefined,
        isLoading: true,
      },
    })

    render(<DictionaryValues />)

    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
  })

  it('should render page content if dictionary with given id exist', () => {
    useDictionaryMock.mockReturnValue({
      getDictionary: {
        data: mockDictionary,
        isLoading: false,
      },
    })

    useDictionaryValuesMock.mockReturnValue({
      getDictionaryValues: {
        data: dictionaryValuesMockResponse,
        isLoading: false,
      },
    })

    render(<DictionaryValues />)

    expect(screen.getByText('dictionaries-[dictionaryId]:title'))
    expect(DictionaryValuesTable).toBeCalledWith(
      {
        dictionary: mockDictionary,
        dictionaryValues: dictionaryValuesMockResponse.data,
        total: dictionaryValuesMockResponse.totalItems,
        pagination: expect.any(Object),
      },
      expect.any(Object)
    )
  })

  it('should render add new value button if there is created dictionary values', () => {
    useDictionaryMock.mockReturnValue({
      getDictionary: {
        data: useDictionaryMock,
        isLoading: false,
      },
    })

    useDictionaryValuesMock.mockReturnValue({
      getDictionaryValues: {
        data: {
          data: getDictionaryValuesMock('1').slice(0, 10),
          page: 1,
          limit: 1,
          total: dictionaryValuesMock.length,
        },
        isLoading: false,
      },
    })

    render(<DictionaryValues />)

    expect(
      screen.getByText('dictionaries-[dictionaryId]:buttons.addNewDictionaryValue')
    ).toBeInTheDocument()
  })
})
