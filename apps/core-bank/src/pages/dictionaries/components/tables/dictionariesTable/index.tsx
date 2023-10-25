import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import {
  Badge,
  BadgeProps,
  Button,
  Dropdown,
  Spin,
  Table,
  TableColumnsType,
  UsePaginationResults,
} from 'ui'

import { RoutesConsts } from '@/consts'
import { Dictionary, DictionaryStatuses } from '@/domains/dictionaries'
import { TFunction, useTranslation } from '@/i18n'

const getDictionaryTableColumns = (t: TFunction): TableColumnsType<DictionariesTableRecord> => {
  return [
    {
      title: t('dictionaries:dictionariesTable.columns.titles.code'),
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: t('dictionaries:dictionariesTable.columns.titles.name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('dictionaries:dictionariesTable.columns.titles.status'),
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: t('common:tables.columns.titles.actions'),
      dataIndex: 'actions',
      key: 'actions',
      width: '80px',
      fixed: 'right',
    },
  ]
}

const getDictionaryStatusDisplay = (
  t: TFunction
): Record<Dictionary['status'], { label: string; status: BadgeProps['status'] }> => ({
  [DictionaryStatuses.Active]: {
    label: t('dictionaries:dictionariesTable.dictionaryStatuses.active'),
    status: 'success',
  },
  [DictionaryStatuses.Inactive]: {
    label: t('dictionaries:dictionariesTable.dictionaryStatuses.inactive'),
    status: 'error',
  },
})

const getDictionaryTableRowActions = (t: TFunction) => [
  {
    key: 'edit',
    label: t('common:tables.rowActions.edit'),
  },
]

interface DictionariesTableRecord
  extends Pick<Dictionary, 'name' | 'code'>,
    Record<string, unknown> {
  source: Dictionary
  status: ReactNode
  actions: ReactNode
}

interface DictionariesTableProps {
  dictionaries: Dictionary[]
  total: number
  pagination: UsePaginationResults
}

export const DictionariesTable = ({ dictionaries, total, pagination }: DictionariesTableProps) => {
  const router = useRouter()
  const { t, ready } = useTranslation(['common', 'dictionaries'])

  const dictionaryStatusDisplay = getDictionaryStatusDisplay(t)
  const dictionaryColumns = getDictionaryTableColumns(t)
  const dictionaryTableRowActions = getDictionaryTableRowActions(t)

  const isLoading = !ready

  if (isLoading) {
    return <Spin fullscreen />
  }

  return (
    <Table<DictionariesTableRecord>
      scroll={{ x: true }}
      columns={dictionaryColumns}
      pagination={{
        ...pagination,
        total: total,
        showTotal: (total, range) =>
          t('common:tables.pagination.totalItems', { from: range[0], to: range[1], total }),
      }}
      onRow={dictionaryTableRecord => ({
        onClick: () =>
          router.push(RoutesConsts.getDictionaryRoute(String(dictionaryTableRecord.source.id))),
      })}
      dataSource={dictionaries.map(dictionary => ({
        name: dictionary.name,
        code: dictionary.code,
        key: dictionary.id,
        status: (
          <Badge
            status={dictionaryStatusDisplay[dictionary.status].status}
            text={dictionaryStatusDisplay[dictionary.status].label}
          />
        ),
        source: dictionary,
        actions: (
          <Dropdown menu={{ items: dictionaryTableRowActions }}>
            <Button type="link">...</Button>
          </Dropdown>
        ),
      }))}
    />
  )
}
