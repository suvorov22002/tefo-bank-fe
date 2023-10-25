import { render, screen } from '@testing-library/react'

import { DictionaryValueStatuses } from '@/domains/dictionaries'
import { i18nMock } from '@/_tests/mocks/i18n'
import { dictionariesMock, getDictionaryValuesMock } from '@/domains/dictionaries/api/mocks'

import { DictionaryValuesTable } from './index'

jest.mock('next/router', () => require('next-router-mock'))
jest.mock('next-i18next', () => i18nMock)

describe('DictionaryValuesTable', () => {
  const dictionaryValuesMock = getDictionaryValuesMock('1')

  it('should display dictionary value properties', () => {
    const currentPageSize = 10
    const currentPage = 1

    const expectedColumnsTitles = [
      'dictionaries-[dictionaryId]:dictionaryValuesTable.columns.titles.name',
      'dictionaries-[dictionaryId]:dictionaryValuesTable.columns.titles.code',
      'dictionaries-[dictionaryId]:dictionaryValuesTable.columns.titles.status',
      'common:tables.columns.titles.actions',
    ]

    render(
      <DictionaryValuesTable
        dictionary={dictionariesMock[0]}
        dictionaryValues={dictionaryValuesMock}
        total={dictionaryValuesMock.length}
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

    const statusesCount = dictionaryValuesMock.slice(0, currentPageSize).reduce<{
      [DictionaryValueStatuses.Active]: number
      [DictionaryValueStatuses.Inactive]: number
    }>(
      (prev, curr) => {
        prev[curr.status]++

        return prev
      },
      {
        [DictionaryValueStatuses.Active]: 0,
        [DictionaryValueStatuses.Inactive]: 0,
      }
    )

    for (const expectedColumnTitle of expectedColumnsTitles) {
      expect(screen.getByText(expectedColumnTitle)).toBeInTheDocument()
    }

    for (let i = 0; i < currentPageSize; i++) {
      expect(screen.getByText(dictionaryValuesMock[i].name)).toBeInTheDocument()
      expect(screen.getByText(dictionaryValuesMock[i].code)).toBeInTheDocument()
    }

    expect(
      screen.getAllByText(
        'dictionaries-[dictionaryId]:dictionaryValuesTable.dictionaryValueStatuses.active'
      )
    ).toHaveLength(statusesCount[DictionaryValueStatuses.Active])

    expect(
      screen.getAllByText(
        'dictionaries-[dictionaryId]:dictionaryValuesTable.dictionaryValueStatuses.inactive'
      )
    ).toHaveLength(statusesCount[DictionaryValueStatuses.Inactive])
  })
})
