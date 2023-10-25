import { ReactNode } from 'react'
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
import { NextRouter, useRouter } from 'next/router'

import { RoutesConsts } from '@/consts'
import { Dictionary, DictionaryStatuses, DictionaryValue } from '@/domains/dictionaries'
import { TFunction, useTranslation } from '@/i18n'

const getDictionaryValuesTableColumns = (
  t: TFunction
): TableColumnsType<DictionariesTableRecord> => {
  return [
    {
      title: t('dictionaries-[dictionaryId]:dictionaryValuesTable.columns.titles.name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('dictionaries-[dictionaryId]:dictionaryValuesTable.columns.titles.code'),
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: t('dictionaries-[dictionaryId]:dictionaryValuesTable.columns.titles.status'),
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

const getDictionaryValuesStatusDisplay = (
  t: TFunction
): Record<DictionaryValue['status'], { label: string; status: BadgeProps['status'] }> => ({
  [DictionaryStatuses.Active]: {
    label: t('dictionaries-[dictionaryId]:dictionaryValuesTable.dictionaryValueStatuses.active'),
    status: 'success',
  },
  [DictionaryStatuses.Inactive]: {
    label: t('dictionaries-[dictionaryId]:dictionaryValuesTable.dictionaryValueStatuses.inactive'),
    status: 'error',
  },
})

const getDictionaryValuesTableRowActions = (
  dictionaryId: Dictionary['id'],
  valueId: DictionaryValue['id'],
  t: TFunction,
  router: NextRouter
) => [
  {
    key: 'edit',
    label: t('common:tables.rowActions.edit'),
    onClick: () =>
      router.push({
        pathname: RoutesConsts.getDictionaryValueRoute(dictionaryId, valueId),
        query: {
          isInitialModeEdit: true,
        },
      }),
  },
]

interface DictionaryValuesTableProps {
  dictionary: Dictionary | undefined
  dictionaryValues: DictionaryValue[]
  total: number
  pagination: UsePaginationResults
}

interface DictionariesTableRecord
  extends Pick<DictionaryValue, 'name' | 'code'>,
    Record<string, unknown> {
  source: DictionaryValue
  status: ReactNode
  actions: ReactNode
}

export const DictionaryValuesTable = ({
  dictionary,
  dictionaryValues,
  total,
  pagination,
}: DictionaryValuesTableProps) => {
  const router = useRouter()
  const { t, ready } = useTranslation(['common', 'dictionaries-[dictionaryId]'])

  const dictionaryValuesStatusDisplay = getDictionaryValuesStatusDisplay(t)
  const dictionaryValuesColumns = getDictionaryValuesTableColumns(t)

  const isLoading = !ready

  if (isLoading) {
    return <Spin fullscreen />
  }

  return (
    <Table<DictionariesTableRecord>
      scroll={{ x: true }}
      columns={dictionaryValuesColumns}
      pagination={{
        ...pagination,
        total,
        showTotal: (total, range) =>
          t('common:tables.pagination.totalItems', { from: range[0], to: range[1], total }),
      }}
      dataSource={dictionaryValues.map(dictionaryValue => ({
        name: dictionaryValue.name,
        code: dictionaryValue.code,
        key: dictionaryValue.id,
        status: (
          <Badge
            status={dictionaryValuesStatusDisplay[dictionaryValue.status].status}
            text={dictionaryValuesStatusDisplay[dictionaryValue.status].label}
          />
        ),
        source: dictionaryValue,
        actions: (
          <Dropdown
            menu={{
              items:
                dictionary &&
                getDictionaryValuesTableRowActions(dictionary.id, dictionaryValue.id, t, router),
            }}
          >
            <Button type="link">...</Button>
          </Dropdown>
        ),
      }))}
    />
  )
}
