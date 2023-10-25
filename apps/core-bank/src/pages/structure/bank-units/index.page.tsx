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
import { useBankUnitTypes } from '@/domains/bankUnitTypes'
import { BankUnit, BankUnitStatus, useBankUnits } from '@/domains/bankUnits'
import { TFunction, useTranslation } from '@/i18n'

import styles from './styles.module.scss'

const getBankUnitStatusDisplay = (
  t: TFunction
): Record<BankUnit['status'], { label: string; status: BadgeProps['status'] }> => ({
  [BankUnitStatus.ACTIVE]: {
    label: t('structure-bank-units:bankUnitsTable.unitStatuses.active'),
    status: 'success',
  },
  [BankUnitStatus.INACTIVE]: {
    label: t('structure-bank-units:bankUnitsTable.unitStatuses.inactive'),
    status: 'error',
  },
  [BankUnitStatus.IDLE]: {
    label: t('structure-bank-units:bankUnitsTable.unitStatuses.idle'),
    status: 'warning',
  },
})

const getBankUnitTableColumns = (t: TFunction): TableColumnsType<BankUnitTableRecord> => [
  {
    title: t('structure-bank-units:bankUnitsTable.columns.titles.name'),
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: t('structure-bank-units:bankUnitsTable.columns.titles.code'),
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: t('structure-bank-units:bankUnitsTable.columns.titles.unitType'),
    dataIndex: 'unitTypeName',
    key: 'unitTypeName',
  },
  {
    title: t('structure-bank-units:bankUnitsTable.columns.titles.parent'),
    dataIndex: 'parentName',
    key: 'parentName',
  },
  {
    title: t('structure-bank-units:bankUnitsTable.columns.titles.streetLine'),
    dataIndex: 'streetLine',
    key: 'streetLine',
  },
  {
    title: t('structure-bank-units:bankUnitsTable.columns.titles.city'),
    dataIndex: 'city',
    key: 'city',
  },
  {
    title: t('structure-bank-units:bankUnitsTable.columns.titles.region'),
    dataIndex: 'region',
    key: 'region',
  },
  {
    title: t('structure-bank-units:bankUnitsTable.columns.titles.zipCode'),
    dataIndex: 'zipCode',
    key: 'zipCode',
  },
  {
    title: t('structure-bank-units:bankUnitsTable.columns.titles.phoneNumber'),
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: t('structure-bank-units:bankUnitsTable.columns.titles.email'),
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: t('structure-bank-units:bankUnitsTable.columns.titles.isDataRestricted'),
    dataIndex: 'isDataRestricted',
    key: 'isDataRestricted',
    align: TableColumnsAlignOptions.Center,
  },
  {
    title: t('structure-bank-units:bankUnitsTable.columns.titles.status'),
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

const getBankUnitTableRowActions = (t: TFunction, router: NextRouter, unitId: BankUnit['id']) => [
  {
    key: 'edit',
    label: t('common:tables.rowActions.edit'),
    onClick: () =>
      router.push({
        pathname: RoutesConsts.getBankUnitRoute(unitId),
        query: {
          isInitialModeEdit: true,
        },
      }),
  },
]

interface BankUnitTableRecord extends Omit<BankUnit, 'status' | 'isDataRestricted'> {
  source: BankUnit
  status: ReactNode
  isDataRestricted: ReactNode
}

const BankUnits: NextPageWithLayout = () => {
  const router = useRouter()
  const pagination = usePagination()
  const { t, ready } = useTranslation(['common', 'structure-bank-units'])

  const { getBankUnits } = useBankUnits({ page: pagination.current, limit: pagination.pageSize })
  // getBankUnitTypes data needed only to check if there are created unitTypes
  const { getBankUnitTypes } = useBankUnitTypes({ page: 1, limit: 10 })

  const isLoading = !ready || getBankUnits.isLoading || getBankUnitTypes.isLoading

  if (isLoading) {
    return <Spin fullscreen />
  }

  const bankUnitStatusDisplay = getBankUnitStatusDisplay(t)
  const bankUnitTableColumns = getBankUnitTableColumns(t)

  return (
    <div className={styles.bankUnits}>
      {!!getBankUnits.data?.data.length && (
        <Header
          title={t('structure-bank-units:title')}
          className={styles.bankUnits__header}
          extra={
            getBankUnitTypes.data?.data.length ? (
              <>
                <Button
                  icon={<PlusSquareOutlinedIcon />}
                  onClick={() => router.push(RoutesConsts.CreateBankUnit)}
                >
                  {t('structure-bank-units:buttons.addNewUnit')}
                </Button>
              </>
            ) : undefined
          }
        />
      )}

      <Content>
        {getBankUnits.data?.data.length ? (
          <Card className={styles.bankUnits__contentCard}>
            <Table<BankUnitTableRecord>
              scroll={{ x: true }}
              loading={getBankUnits.isLoading}
              columns={bankUnitTableColumns}
              pagination={{
                ...pagination,
                total: getBankUnits.data?.totalItems,
                showTotal: (total, range) =>
                  t('common:tables.pagination.totalItems', { from: range[0], to: range[1], total }),
              }}
              dataSource={getBankUnits.data.data.map(unit => ({
                ...unit,
                key: unit.id,
                source: unit,
                phoneNumber:
                  unit.phoneCode && unit.shortPhoneNumber && unit.phoneCode + unit.shortPhoneNumber,
                status: (
                  <Badge
                    status={bankUnitStatusDisplay[unit.status].status}
                    text={bankUnitStatusDisplay[unit.status].label}
                  />
                ),
                isDataRestricted: (
                  <Checkbox
                    checked={unit.isDataRestricted}
                    name="isDataRestricted"
                    noStyle
                    disabled
                  />
                ),
                actions: (
                  <Dropdown menu={{ items: getBankUnitTableRowActions(t, router, unit.id) }}>
                    <Button type="link">...</Button>
                  </Dropdown>
                ),
              }))}
              onRow={record => ({
                onClick: () => router.push(RoutesConsts.getBankUnitRoute(record.source.id)),
              })}
            />
          </Card>
        ) : (
          <Empty
            className={styles.bankUnits__empty}
            image={<EmptyDefaultSvg />}
            description={
              getBankUnitTypes.data?.data.length
                ? t('structure-bank-units:empty.noUnits')
                : t('structure-bank-units:empty.noUnitTypes')
            }
          >
            <Button
              type="primary"
              size="large"
              disabled={!getBankUnitTypes.data?.data.length}
              onClick={() =>
                getBankUnitTypes.data?.data.length && router.push(RoutesConsts.CreateBankUnit)
              }
            >
              {t('common:buttons.create')}
            </Button>
          </Empty>
        )}
      </Content>
    </div>
  )
}

BankUnits.getLayout = getCoreBankDefaultLayout

export default BankUnits
