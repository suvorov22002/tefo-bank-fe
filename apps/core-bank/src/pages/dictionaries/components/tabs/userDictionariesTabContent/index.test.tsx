import { UsePaginationResults } from 'ui'
import { render, screen } from '@testing-library/react'

import { GetUserDictionariesResponseData } from '@/domains/dictionaries'
import { i18nMock } from '@/_tests/mocks/i18n'
import { userDictionariesMock } from '@/domains/dictionaries/api/mocks'

import { DictionariesTable } from '../../tables'
import { UserDictionariesTabContent } from './index'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))

jest.mock('../../tables', () => ({
  DictionariesTable: jest.fn(() => <div data-testid="dictionariesTable" />),
}))

const usePaginationResultsMock: UsePaginationResults = {
  current: 1,
  pageSize: 10,
  pageSizeOptions: [10, 20, 50, 100],
  setCurrent: jest.fn,
  setPageSize: jest.fn,
  onChange: jest.fn,
}

describe('UserDictionariesTab', () => {
  const mockUserDictionariesData: GetUserDictionariesResponseData = {
    data: userDictionariesMock.slice(0, 10),
    totalItems: userDictionariesMock.length,
    page: 1,
    limit: 10,
  }

  const mockUserDictionariesTabContentProps = {
    userDictionariesData: mockUserDictionariesData,
    pagination: usePaginationResultsMock,
  }

  it('should show tab content if data is loaded', () => {
    render(<UserDictionariesTabContent {...mockUserDictionariesTabContentProps} />)

    expect(screen.getByText('dictionaries:tabs.userDictionaries.title')).toBeInTheDocument()
    expect(screen.getByTestId('dictionariesTable')).toBeInTheDocument()
    expect(DictionariesTable).toBeCalledWith(
      {
        dictionaries: mockUserDictionariesData.data,
        total: mockUserDictionariesData.totalItems,
        pagination: expect.any(Object),
      },
      expect.any(Object)
    )
  })

  it('should show empty state if there is no created user dictionaries', () => {
    render(
      <UserDictionariesTabContent
        {...mockUserDictionariesTabContentProps}
        userDictionariesData={{ ...mockUserDictionariesData, data: [] }}
      />
    )

    expect(screen.queryByTestId('dictionariesTable')).not.toBeInTheDocument()
    expect(
      screen.getByText('dictionaries:tabs.userDictionaries.emptyDescription')
    ).toBeInTheDocument()
  })
})
