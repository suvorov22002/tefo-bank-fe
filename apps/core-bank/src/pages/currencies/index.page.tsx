import { ReactNode } from 'react'
import {
  Badge,
  BadgeProps,
  Button,
  Card,
  Checkbox,
  Content,
  Dropdown,
  Empty,
  EmptyDefaultSvg,
  Header,
  PlusSquareOutlinedIcon,
  Spin,
  Table,
  TableColumnsAlignOptions,
  TableColumnsType,
  Tag,
  TagProps,
  usePagination,
} from 'ui'
import { NextRouter, useRouter } from 'next/router'

import { NextPageWithLayout } from '@/types'
import { RoutesConsts } from '@/consts'
import { getCoreBankDefaultLayout } from '@/components'
import { Currency, CurrencyStatus, CurrencyUsageInBank, useCurrencies } from '@/domains/currencies'

import { TFunction, useTranslation } from '@/i18n'

import styles from './styles.module.scss'

const getCurrencyStatusDisplay = (
  t: TFunction
): Record<CurrencyStatus, { label: string; status: BadgeProps['status'] }> => ({
  [CurrencyStatus.Active]: {
    label: t('currencies:currenciesTable.currencyStatuses.active'),
    status: 'success',
  },
  [CurrencyStatus.Inactive]: {
    label: t('currencies:currenciesTable.currencyStatuses.inactive'),
    status: 'error',
  },
})

const getCurrencyUsageTagColor = (usage: CurrencyUsageInBank): string => {
  switch (usage) {
    case CurrencyUsageInBank.Cash:
      return 'blue'
    case CurrencyUsageInBank.LegalTender:
      return 'geekblue'
    case CurrencyUsageInBank.NonCash:
      return 'orange'
    case CurrencyUsageInBank.Reference:
      return 'purple'
    default:
      return 'red'
  }
}

const getCurrencyUsageDisplay = (
  t: TFunction
): Record<CurrencyUsageInBank, { label: string; tagProps: TagProps }> => ({
  [CurrencyUsageInBank.Cash]: {
    label: t('currencies:currenciesTable.currencyUsageInBank.cash'),
    tagProps: { color: getCurrencyUsageTagColor(CurrencyUsageInBank.Cash) },
  },
  [CurrencyUsageInBank.LegalTender]: {
    label: t('currencies:currenciesTable.currencyUsageInBank.legalTender'),
    tagProps: { color: getCurrencyUsageTagColor(CurrencyUsageInBank.LegalTender) },
  },
  [CurrencyUsageInBank.NonCash]: {
    label: t('currencies:currenciesTable.currencyUsageInBank.nonCash'),
    tagProps: { color: getCurrencyUsageTagColor(CurrencyUsageInBank.NonCash) },
  },
  [CurrencyUsageInBank.Reference]: {
    label: t('currencies:currenciesTable.currencyUsageInBank.reference'),
    tagProps: { color: getCurrencyUsageTagColor(CurrencyUsageInBank.Reference) },
  },
})

const getCurrencyTableColumns = (t: TFunction): TableColumnsType<CurrencyTableRecord> => [
  {
    title: t('currencies:currenciesTable.columns.titles.name'),
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: t('currencies:currenciesTable.columns.titles.alphabeticCode'),
    dataIndex: 'alphabeticCode',
    key: 'alphabeticCode',
    align: TableColumnsAlignOptions.Center,
  },
  {
    title: t('currencies:currenciesTable.columns.titles.numericCode'),
    dataIndex: 'numericCode',
    key: 'numericCode',
  },
  {
    title: t('currencies:currenciesTable.columns.titles.symbol'),
    dataIndex: 'symbol',
    key: 'symbol',
    align: TableColumnsAlignOptions.Center,
  },
  {
    title: t('currencies:currenciesTable.columns.titles.numberOfDecimals'),
    dataIndex: 'numberOfDecimals',
    key: 'numberOfDecimals',
    align: TableColumnsAlignOptions.Center,
  },
  {
    title: t('currencies:currenciesTable.columns.titles.usageInBank'),
    dataIndex: 'usageInBankTags',
    key: 'usageInBankTags',
  },
  {
    title: t('currencies:currenciesTable.columns.titles.status'),
    dataIndex: 'status',
    key: 'status',
    align: TableColumnsAlignOptions.Center,
  },
  {
    title: t('common:tables.columns.titles.actions'),
    dataIndex: 'actions',
    key: 'actions',
    width: '80px',
    fixed: 'right',
  },
]

const getCurrencyTableRowActions = (
  t: TFunction,
  router: NextRouter,
  currencyId: Currency['id']
) => [
  {
    key: 'edit',
    label: t('common:tables.rowActions.edit'),
    onClick: () =>
      router.push({
        pathname: RoutesConsts.getCurrencyRoute(String(currencyId)),
        query: { isInitialModeEdit: true },
      }),
  },
]

const desiredOrder = [
  CurrencyUsageInBank.NonCash,
  CurrencyUsageInBank.Cash,
  CurrencyUsageInBank.LegalTender,
  CurrencyUsageInBank.Reference,
]

interface CurrencyTableRecord extends Omit<Currency, 'status'> {
  source: Currency
  usageInBankTags: ReactNode[]
  status: ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

const Currencies: NextPageWithLayout = () => {
  const router = useRouter()
  const pagination = usePagination()
  const { t, ready } = useTranslation(['common', 'currencies'])
  const { getCurrencies } = useCurrencies({ page: pagination.current, limit: pagination.pageSize })

  const isLoading = !ready || getCurrencies.isLoading

  if (isLoading) {
    return <Spin fullscreen />
  }

  const currencyStatusDisplay = getCurrencyStatusDisplay(t)
  const currencyUsageDisplay = getCurrencyUsageDisplay(t)
  const currencyTableColumns = getCurrencyTableColumns(t)

  return (
    <div className={styles.currencies}>
      <Header title={t('currencies:title')} className={styles.currencies__header} />

      <Content>
        {getCurrencies.data?.data.length ? (
          <Card
            className={styles.currencies__contentCard}
            title={t('currencies:subtitle')}
            extra={
              <Button
                icon={<PlusSquareOutlinedIcon />}
                onClick={() => router.push(RoutesConsts.CreateCurrency)}
              >
                {t('currencies:buttons.addCurrency')}
              </Button>
            }
          >
            <Table<CurrencyTableRecord>
              scroll={{ x: true }}
              columns={currencyTableColumns}
              pagination={{
                ...pagination,
                total: getCurrencies.data?.totalItems,
                showTotal: (total, range) =>
                  t('common:tables.pagination.totalItems', { from: range[0], to: range[1], total }),
              }}
              dataSource={getCurrencies.data?.data.map(currency => ({
                ...currency,
                key: currency.id,
                source: currency,
                isVirtual: <Checkbox name="isVisible" noStyle disabled />,
                usageInBankTags: desiredOrder.map(usage => {
                  if (currency.usageInBank.includes(usage)) {
                    return (
                      <Tag key={usage} {...currencyUsageDisplay[usage].tagProps}>
                        {currencyUsageDisplay[usage].label}
                      </Tag>
                    )
                  }
                }),
                status: (
                  <Badge
                    status={currencyStatusDisplay[currency.status].status}
                    text={currencyStatusDisplay[currency.status].label}
                  />
                ),

                actions: (
                  <Dropdown
                    menu={{
                      items: getCurrencyTableRowActions(t, router, currency.id),
                    }}
                  >
                    <Button type="link">...</Button>
                  </Dropdown>
                ),
              }))}
              onRow={record => ({
                onClick: () => router.push(RoutesConsts.getCurrencyRoute(String(record.source.id))),
              })}
            />
          </Card>
        ) : (
          <Empty
            className={styles.currencies__empty}
            image={<EmptyDefaultSvg />}
            description={t('currencies:empty.noCurrencies')}
          >
            <Button
              type="primary"
              size="large"
              onClick={() => router.push(RoutesConsts.CreateCurrency)}
            >
              {t('common:buttons.create')}
            </Button>
          </Empty>
        )}
      </Content>
    </div>
  )
}

Currencies.getLayout = getCoreBankDefaultLayout

export default Currencies
