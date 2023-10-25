import { render, screen } from '@testing-library/react'

import { GetSystemDictionariesResponseData } from '@/domains/dictionaries'
import { i18nMock } from '@/_tests/mocks/i18n'
import { systemDictionariesMock } from '@/domains/dictionaries/api/mocks'

import { DictionariesTable } from '../../tables'
import { SystemDictionariesTabContent } from './index'
import { useSystemDictionaries } from '../../../../../domains/dictionaries/useSystemDictionaries'

jest.mock('next-i18next', () => i18nMock)
jest.mock('../../../../../domains/dictionaries/useSystemDictionaries')

jest.mock('../../tables', () => ({
  DictionariesTable: jest.fn(() => <div data-testid="dictionariesTable" />),
}))

jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useSystemDictionariesMock = useSystemDictionaries as jest.MockedFunction<any>

describe('SystemDictionariesTab', () => {
  const mockSystemDictionariesResponse: GetSystemDictionariesResponseData = {
    data: systemDictionariesMock.slice(0, 10),
    totalItems: systemDictionariesMock.length,
    page: 1,
    limit: 10,
  }

  afterEach(() => {
    useSystemDictionariesMock.mockReset()
  })

  it('should show loading indicator while data is fetching', () => {
    useSystemDictionariesMock.mockReturnValueOnce({
      getSystemDictionaries: {
        data: undefined,
        isLoading: true,
      },
    })

    render(<SystemDictionariesTabContent />)

    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
    expect(screen.queryByText('dictionaries:tabs.systemDictionaries.title')).not.toBeInTheDocument()
    expect(screen.queryByTestId('dictionariesTable')).not.toBeInTheDocument()
  })

  it('should show tab content if data is loaded', () => {
    useSystemDictionariesMock.mockReturnValueOnce({
      getSystemDictionaries: {
        data: mockSystemDictionariesResponse,
        isLoading: false,
      },
    })

    render(<SystemDictionariesTabContent />)

    expect(screen.getByText('dictionaries:tabs.systemDictionaries.title')).toBeInTheDocument()
    expect(DictionariesTable).toBeCalledWith(
      expect.objectContaining({
        dictionaries: mockSystemDictionariesResponse.data,
        total: mockSystemDictionariesResponse.totalItems,
        pagination: expect.any(Object),
      }),
      expect.any(Object)
    )
  })
})
