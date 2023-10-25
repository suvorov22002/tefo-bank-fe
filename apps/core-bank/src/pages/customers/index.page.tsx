import { ReactNode } from 'react'
import { dateTimeUtils } from 'utils'
import {
  Badge,
  BadgeProps,
  Button,
  Card,
  Content,
  Dropdown,
  Empty,
  EmptyDefaultSvg,
  Header,
  PlusSquareOutlinedIcon,
  Spin,
  Table,
  TableColumnsType,
  usePagination,
} from 'ui'

import { NextPageWithLayout } from '@/types'
import { getCoreBankDefaultLayout } from '@/components'
import { CustomerListItem, CustomerStatuses, useCustomers } from '@/domains/customers'
import { TFunction, useTranslation } from '@/i18n'

import styles from './styles.module.scss'

// TODO: Remove after global date format handling implementation
const DATE_FORMAT = 'DD.MM.YYYY'

interface CustomersTableRecord extends Omit<CustomerListItem, 'status'> {
  source: CustomerListItem
  status: ReactNode
}

const getCustomerStatusDisplay = (
  t: TFunction
): Record<CustomerListItem['status'], { label: string; status: BadgeProps['status'] }> => ({
  [CustomerStatuses.Prospect]: {
    label: t('customers:customersTable.customerStatuses.prospect'),
    status: 'default',
  },
  [CustomerStatuses.PendingAuthorization]: {
    label: t('customers:customersTable.customerStatuses.pendingAuthorization'),
    status: 'processing',
  },
  [CustomerStatuses.Inactive]: {
    label: t('customers:customersTable.customerStatuses.inactive'),
    status: 'default',
  },
  [CustomerStatuses.Active]: {
    label: t('customers:customersTable.customerStatuses.active'),
    status: 'success',
  },
  [CustomerStatuses.Rejected]: {
    label: t('customers:customersTable.customerStatuses.rejected'),
    status: 'default',
  },
  [CustomerStatuses.Closed]: {
    label: t('customers:customersTable.customerStatuses.closed'),
    status: 'default',
  },
})

const getCustomersTableColumns = (t: TFunction): TableColumnsType<CustomersTableRecord> => [
  {
    title: t('customers:customersTable.columns.titles.code'),
    dataIndex: 'code',
    key: 'code',
    fixed: 'left',
  },
  {
    title: t('customers:customersTable.columns.titles.type'),
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: t('customers:customersTable.columns.titles.shortName'),
    dataIndex: 'shortName',
    key: 'shortName',
  },
  {
    title: t('customers:customersTable.columns.titles.residency'),
    dataIndex: 'residency',
    key: 'residency',
  },
  {
    title: t('customers:customersTable.columns.titles.unitName'),
    dataIndex: 'unitName',
    key: 'unitName',
  },
  {
    title: t('customers:customersTable.columns.titles.relationshipManagerName'),
    dataIndex: 'relationshipManagerName',
    key: 'relationshipManagerName',
  },
  {
    title: t('customers:customersTable.columns.titles.status'),
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: t('customers:customersTable.columns.titles.createdAt'),
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: t('customers:customersTable.columns.titles.updatedAt'),
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: t('customers:customersTable.columns.titles.updatedBy'),
    dataIndex: 'updatedBy',
    key: 'updatedBy',
  },
  {
    title: t('common:tables.columns.titles.actions'),
    dataIndex: 'actions',
    key: 'actions',
    width: '80px',
    fixed: 'right',
  },
]

const getCustomersTableRowActions = (t: TFunction) => [
  {
    key: 'edit',
    label: t('common:tables.rowActions.edit'),
    onClick: () => undefined,
  },
  {
    key: 'validate',
    label: t('common:tables.rowActions.validate'),
    onClick: () => undefined,
  },
  {
    key: 'authorise',
    label: t('common:tables.rowActions.authorise'),
    onClick: () => undefined,
  },
  {
    key: 'reject',
    label: t('common:tables.rowActions.reject'),
    onClick: () => undefined,
  },
]

const Customers: NextPageWithLayout = () => {
  const { t, ready } = useTranslation(['common', 'customers'])
  const pagination = usePagination()

  const { getCustomers } = useCustomers({ page: pagination.current, limit: pagination.pageSize })

  const isLoading = !ready || getCustomers.isLoading

  if (isLoading) {
    return <Spin fullscreen />
  }

  const customerStatusDisplay = getCustomerStatusDisplay(t)
  const customersTableColumns = getCustomersTableColumns(t)

  return (
    <div className={styles.customers}>
      <Header title={t('customers:title')} className={styles.customers__header} />
      <Content>
        {getCustomers.data?.data.length ? (
          <Card
            className={styles.customers__contentCard}
            title={t('customers:subtitle')}
            extra={
              <>
                <Button icon={<PlusSquareOutlinedIcon />} onClick={() => undefined}>
                  {t('customers:buttons.addNewCustomer')}
                </Button>
              </>
            }
          >
            <Table<CustomersTableRecord>
              scroll={{ x: true }}
              columns={customersTableColumns}
              pagination={{
                ...pagination,
                total: getCustomers.data.totalItems,
                showTotal: (total, range) =>
                  t('common:tables.pagination.totalItems', { from: range[0], to: range[1], total }),
              }}
              dataSource={getCustomers.data.data.map(customer => ({
                ...customer,
                updatedAt:
                  customer.updatedAt &&
                  dateTimeUtils.dateTime(customer.updatedAt).format(DATE_FORMAT),
                createdAt:
                  customer.createdAt &&
                  dateTimeUtils.dateTime(customer.createdAt).format(DATE_FORMAT),
                residency: t(`customers:customersTable.residency.${customer.residency}`),
                key: customer.id,
                source: customer,
                status: (
                  <Badge
                    status={customerStatusDisplay[customer.status].status}
                    text={customerStatusDisplay[customer.status].label}
                  />
                ),
                actions: (
                  <Dropdown menu={{ items: getCustomersTableRowActions(t) }}>
                    <Button type="link">...</Button>
                  </Dropdown>
                ),
              }))}
              onRow={() => ({
                onClick: () => undefined,
              })}
            />
          </Card>
        ) : (
          <Empty
            className={styles.customers__empty}
            image={<EmptyDefaultSvg />}
            description={t('customers:empty.noCustomers')}
          >
            <Button type="primary" size="large" onClick={() => undefined}>
              {t('common:buttons.create')}
            </Button>
          </Empty>
        )}
      </Content>
    </div>
  )
}

Customers.getLayout = getCoreBankDefaultLayout

export default Customers
