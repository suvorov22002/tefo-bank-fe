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
  usePagination,
} from 'ui'
import { NextRouter, useRouter } from 'next/router'

import { NextPageWithLayout } from '@/types'
import { RoutesConsts } from '@/consts'
import { getCoreBankDefaultLayout } from '@/components'
import { BankUnitType, BankUnitTypeStatus, useBankUnitTypes } from '@/domains/bankUnitTypes'
import { TFunction, useTranslation } from '@/i18n'

import styles from './styles.module.scss'

const getBankUnitTypeStatusDisplay = (
  t: TFunction
): Record<BankUnitTypeStatus, { label: string; status: BadgeProps['status'] }> => ({
  [BankUnitTypeStatus.Active]: {
    label: t('structure-bank-unit-types:bankUnitTypesTable.unitTypeStatuses.active'),
    status: 'success',
  },
  [BankUnitTypeStatus.Inactive]: {
    label: t('structure-bank-unit-types:bankUnitTypesTable.unitTypeStatuses.inactive'),
    status: 'error',
  },
})

const getBankUnitTypeTableColumns = (t: TFunction): TableColumnsType<BankUnitTypeTableRecord> => [
  {
    title: t('structure-bank-unit-types:bankUnitTypesTable.columns.titles.name'),
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: t('structure-bank-unit-types:bankUnitTypesTable.columns.titles.isVirtual'),
    dataIndex: 'isVirtual',
    key: 'isVirtual',
    align: TableColumnsAlignOptions.Center,
  },
  {
    title: t('structure-bank-unit-types:bankUnitTypesTable.columns.titles.status'),
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

const getBankUnitTypeTableRowActions = (
  t: TFunction,
  router: NextRouter,
  id: BankUnitType['id']
) => [
  {
    key: 'edit',
    label: t('common:tables.rowActions.edit'),
    onClick: () =>
      router.push({
        pathname: RoutesConsts.getBankUnitTypeRoute(id),
        query: { isInitialModeEdit: true },
      }),
  },
]

interface BankUnitTypeTableRecord extends Omit<BankUnitType, 'isVirtual' | 'status'> {
  source: BankUnitType
  isVirtual: ReactNode
  status: ReactNode
}

const BankUnitTypes: NextPageWithLayout = () => {
  const router = useRouter()
  const pagination = usePagination()
  const { t, ready } = useTranslation(['common', 'structure-bank-unit-types'])
  const { getBankUnitTypes } = useBankUnitTypes({
    page: pagination.current,
    limit: pagination.pageSize,
  })

  const isLoading = !ready || getBankUnitTypes.isLoading

  if (isLoading) {
    return <Spin fullscreen />
  }

  const bankUnitTypeStatusDisplay = getBankUnitTypeStatusDisplay(t)
  const bankUnitTypeTableColumns = getBankUnitTypeTableColumns(t)

  return (
    <div className={styles.bankUnitTypes}>
      {!!getBankUnitTypes.data?.data.length && (
        <Header
          title={t('structure-bank-unit-types:title')}
          className={styles.bankUnitTypes__header}
          extra={
            <Button
              icon={<PlusSquareOutlinedIcon />}
              onClick={() => router.push(RoutesConsts.CreateBankUnitType)}
            >
              {t('structure-bank-unit-types:buttons.addNewUnitType')}
            </Button>
          }
        />
      )}

      <Content>
        {getBankUnitTypes.data?.data.length ? (
          <Card className={styles.bankUnitTypes__contentCard}>
            <Table<BankUnitTypeTableRecord>
              scroll={{ x: true }}
              columns={bankUnitTypeTableColumns}
              pagination={{
                ...pagination,
                total: getBankUnitTypes.data.totalItems,
                showTotal: (total, range) =>
                  t('common:tables.pagination.totalItems', { from: range[0], to: range[1], total }),
              }}
              dataSource={getBankUnitTypes.data.data.map(unitType => ({
                ...unitType,
                key: unitType.id,
                source: unitType,
                isVirtual: (
                  <Checkbox checked={unitType.isVirtual} name="isVisible" noStyle disabled />
                ),
                status: (
                  <Badge
                    status={bankUnitTypeStatusDisplay[unitType.status].status}
                    text={bankUnitTypeStatusDisplay[unitType.status].label}
                  />
                ),
                actions: (
                  <Dropdown
                    menu={{
                      items: getBankUnitTypeTableRowActions(t, router, unitType.id),
                    }}
                  >
                    <Button type="link">...</Button>
                  </Dropdown>
                ),
              }))}
              onRow={record => ({
                onClick: () => router.push(RoutesConsts.getBankUnitTypeRoute(record.source.id)),
              })}
            />
          </Card>
        ) : (
          <Empty
            className={styles.bankUnitTypes__empty}
            image={<EmptyDefaultSvg />}
            description={t('structure-bank-unit-types:empty.noUnitTypes')}
          >
            <Button
              type="primary"
              size="large"
              onClick={() => router.push(RoutesConsts.CreateBankUnitType)}
            >
              {t('common:buttons.create')}
            </Button>
          </Empty>
        )}
      </Content>
    </div>
  )
}

BankUnitTypes.getLayout = getCoreBankDefaultLayout

export default BankUnitTypes
