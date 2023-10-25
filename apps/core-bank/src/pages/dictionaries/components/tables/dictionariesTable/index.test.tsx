import { render, screen } from '@testing-library/react'

import { DictionaryStatuses } from '@/domains/dictionaries'
import { dictionariesMock } from '@/domains/dictionaries/api/mocks'
import { i18nMock } from '@/_tests/mocks/i18n'

import { DictionariesTable } from './index'

jest.mock('next/router', () => require('next-router-mock'))
jest.mock('next-i18next', () => i18nMock)

describe('DictionariesTable', () => {
  it('should display dictionary properties', () => {
    const currentPageSize = 10
    const currentPage = 1

    const expectedColumnsTitles = [
      'dictionaries:dictionariesTable.columns.titles.code',
      'dictionaries:dictionariesTable.columns.titles.name',
      'dictionaries:dictionariesTable.columns.titles.status',
      'common:tables.columns.titles.actions',
    ]

    render(
      <DictionariesTable
        dictionaries={dictionariesMock}
        total={dictionariesMock.length}
        pagination={{
          current: currentPage,
          pageSize: currentPageSize,
          pageSizeOptions: [10, 20, 50, 100],
          onChange: jest.fn,
          setCurrent: jest.fn,
          setPageSize: jest.fn,
        }}
      />
    )

    const statusesCount = dictionariesMock
      .slice(0, currentPageSize)
      .reduce<{ [DictionaryStatuses.Active]: number; [DictionaryStatuses.Inactive]: number }>(
        (prev, curr) => {
          prev[curr.status]++

          return prev
        },
        {
          [DictionaryStatuses.Active]: 0,
          [DictionaryStatuses.Inactive]: 0,
        }
      )

    for (const expectedColumnTitle of expectedColumnsTitles) {
      expect(screen.getByText(expectedColumnTitle)).toBeInTheDocument()
    }

    for (let i = 0; i < currentPageSize; i++) {
      expect(screen.getByText(dictionariesMock[i].name)).toBeInTheDocument()
    }

    expect(
      screen.getAllByText('dictionaries:dictionariesTable.dictionaryStatuses.active')
    ).toHaveLength(statusesCount[DictionaryStatuses.Active])

    expect(
      screen.getAllByText('dictionaries:dictionariesTable.dictionaryStatuses.inactive')
    ).toHaveLength(statusesCount[DictionaryStatuses.Inactive])
  })
})
