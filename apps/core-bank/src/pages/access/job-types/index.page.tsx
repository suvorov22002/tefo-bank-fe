import { ReactNode } from 'react'
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
import { NextRouter, useRouter } from 'next/router'

import { NextPageWithLayout } from '@/types'
import { RoutesConsts } from '@/consts'
import { getCoreBankDefaultLayout } from '@/components'
import { JobType, JobTypeStatuses, useJobTypes } from '@/domains/jobTypes'
import { TFunction, useTranslation } from '@/i18n'

import styles from './styles.module.scss'

const getJobTypeStatusDisplay = (
  t: TFunction
): Record<JobType['status'], { label: string; status: BadgeProps['status'] }> => ({
  [JobTypeStatuses.Active]: {
    label: t('access-job-types:jobTypesTable.jobTypeStatuses.active'),
    status: 'success',
  },
  [JobTypeStatuses.Inactive]: {
    label: t('access-job-types:jobTypesTable.jobTypeStatuses.inactive'),
    status: 'error',
  },
})

const getJobTypeTableColumns = (t: TFunction): TableColumnsType<JobTypeTableRecord> => [
  {
    title: t('access-job-types:jobTypesTable.columns.titles.name'),
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: t('access-job-types:jobTypesTable.columns.titles.status'),
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

const getJobTypeTableRowActions = (t: TFunction, router: NextRouter, jobTypeId: JobType['id']) => [
  {
    key: 'edit',
    label: t('common:tables.rowActions.edit'),
    onClick: () =>
      router.push({
        pathname: RoutesConsts.getJobTypeRoute(jobTypeId),
        query: {
          isDetailsInitialModeEdit: true,
        },
      }),
  },
]

interface JobTypeTableRecord extends Omit<JobType, 'status'> {
  source: JobType
  status: ReactNode
}

const JobTypes: NextPageWithLayout = () => {
  const router = useRouter()
  const pagination = usePagination()
  const { t, ready } = useTranslation(['common', 'access-job-types'])
  const { getJobTypes } = useJobTypes({ page: pagination.current, limit: pagination.pageSize })

  const isLoading = !ready || getJobTypes.isLoading

  if (isLoading) {
    return <Spin fullscreen />
  }

  const jobTypeStatusDisplay = getJobTypeStatusDisplay(t)
  const jobTypeTableColumns = getJobTypeTableColumns(t)

  return (
    <div className={styles.jobTypes}>
      {!!getJobTypes.data?.data.length && (
        <Header
          title={t('access-job-types:title')}
          className={styles.jobTypes__header}
          extra={
            getJobTypes.data?.data.length ? (
              <Button
                icon={<PlusSquareOutlinedIcon />}
                onClick={() => router.push(RoutesConsts.CreateJobType)}
              >
                {t('access-job-types:buttons.addNewJobType')}
              </Button>
            ) : undefined
          }
        />
      )}
      <Content>
        {getJobTypes.data?.data.length ? (
          <Card
            className={styles.jobTypes__contentCard}
            title={t('access-job-types:jobTypesTitle')}
          >
            <Table<JobTypeTableRecord>
              scroll={{ x: true }}
              columns={jobTypeTableColumns}
              pagination={{
                ...pagination,
                total: getJobTypes.data.totalItems,
                showTotal: (total, range) =>
                  t('common:tables.pagination.totalItems', { from: range[0], to: range[1], total }),
              }}
              dataSource={getJobTypes.data.data.map(jobType => ({
                ...jobType,
                key: jobType.id,
                source: jobType,
                status: (
                  <Badge
                    status={jobTypeStatusDisplay[jobType.status].status}
                    text={jobTypeStatusDisplay[jobType.status].label}
                  />
                ),
                actions: (
                  <Dropdown
                    menu={{
                      items: getJobTypeTableRowActions(t, router, jobType.id),
                    }}
                  >
                    <Button type="link">...</Button>
                  </Dropdown>
                ),
              }))}
              onRow={record => ({
                onClick: () => router.push(RoutesConsts.getJobTypeRoute(record.source.id)),
              })}
            />
          </Card>
        ) : (
          <Empty
            className={styles.jobTypes__empty}
            image={<EmptyDefaultSvg />}
            description={t('access-job-types:empty.noJobTypes')}
          >
            <Button
              type="primary"
              size="large"
              onClick={() => router.push(RoutesConsts.CreateJobType)}
            >
              {t('access-job-types:buttons.createJobType')}
            </Button>
          </Empty>
        )}
      </Content>
    </div>
  )
}

JobTypes.getLayout = getCoreBankDefaultLayout

export default JobTypes
