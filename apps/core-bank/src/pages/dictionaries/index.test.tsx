import MockRouter from 'next-router-mock'
import { fireEvent, render, screen } from '@testing-library/react'

import { GetUserDictionariesResponseData } from '@/domains/dictionaries'
import { RoutesConsts } from '@/consts'
import { i18nMock } from '@/_tests/mocks/i18n'

import { userDictionariesMock } from '@/domains/dictionaries/api/mocks'

import Dictionaries from './index.page'
import { DictionariesTabsKeys } from './types'
import { useUserDictionaries } from '../../domains/dictionaries/useUserDictionaries'

jest.mock('next-i18next', () => i18nMock)
jest.mock('../../domains/dictionaries/useUserDictionaries')
jest.mock('next/router', () => require('next-router-mock'))

jest.mock('./components', () => ({
  SystemDictionariesTabContent: () => <div data-testid="systemDictionariesTabContent" />,
  UserDictionariesTabContent: () => <div data-testid="userDictionariesTabContent" />,
}))

jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useUserDictionariesMock = useUserDictionaries as jest.MockedFunction<any>

describe('Dictionaries page', () => {
  const mockUserDictionariesResponse: GetUserDictionariesResponseData = {
    data: userDictionariesMock.slice(0, 10),
    totalItems: userDictionariesMock.length,
    page: 1,
    limit: 10,
  }

  afterEach(() => {
    useUserDictionariesMock.mockReset()
  })

  it('should show loading indicator while data is fetching', () => {
    useUserDictionariesMock.mockReturnValue({
      getUserDictionaries: {
        data: undefined,
        isLoading: true,
      },
    })

    render(<Dictionaries />)

    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
    expect(screen.queryByTestId('systemDictionariesTabContent')).not.toBeInTheDocument()
    expect(screen.queryByTestId('userDictionariesTabContent')).not.toBeInTheDocument()
  })

  it('should render page content', () => {
    useUserDictionariesMock.mockReturnValue({
      getUserDictionaries: {
        data: mockUserDictionariesResponse,
        isLoading: false,
      },
    })
    render(<Dictionaries />)

    expect(screen.getByText('dictionaries:title'))
    expect(screen.getByText('dictionaries:tabs.userDictionaries.label'))
    expect(screen.getByText('dictionaries:tabs.systemDictionaries.label'))
    expect(screen.getByTestId('userDictionariesTabContent')).toBeInTheDocument()
  })

  it('should switch tabs', () => {
    useUserDictionariesMock.mockReturnValue({
      getUserDictionaries: {
        data: mockUserDictionariesResponse,
        isLoading: false,
      },
    })
    render(<Dictionaries />)

    const systemTab = screen.getByText('dictionaries:tabs.systemDictionaries.label')

    fireEvent.click(systemTab)

    expect(screen.getByTestId('systemDictionariesTabContent')).toBeInTheDocument()
  })

  it('should render add new dictionary button if user tab is active and there is created user dictionaries', () => {
    useUserDictionariesMock.mockReturnValue({
      getUserDictionaries: {
        data: mockUserDictionariesResponse,
        isLoading: false,
      },
    })

    MockRouter.push({
      query: {
        activeTabKey: DictionariesTabsKeys.User,
      },
      pathname: RoutesConsts.Dictionaries,
    })

    render(<Dictionaries />)

    expect(screen.getByText('dictionaries:buttons.addNewDictionary')).toBeInTheDocument()

    const systemTab = screen.getByText('dictionaries:tabs.systemDictionaries.label')

    fireEvent.click(systemTab)

    expect(screen.queryByText('dictionaries:buttons.addNewDictionary')).not.toBeInTheDocument()
  })
})
