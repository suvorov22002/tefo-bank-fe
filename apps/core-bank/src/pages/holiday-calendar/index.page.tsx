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
  Select,
  Spin,
  Table,
  TableColumnsType,
  usePagination,
} from 'ui'
import { NextRouter, useRouter } from 'next/router'
import { ReactNode, useState } from 'react'

import { NextPageWithLayout } from '@/types'
import { RoutesConsts } from '@/consts'
import { getCoreBankDefaultLayout } from '@/components'
import {
  DayType,
  HolidayCalendar,
  HolidayCalendarStatus,
  useHolidayCalendars,
} from '@/domains/holidayCalendar'
import { TFunction, useTranslation } from '@/i18n'

import styles from './styles.module.scss'
import { DATE_FORMAT, getHolidayCalendarsDayTypeFilterOptions } from './utils'

const getHolidayCalendarsStatusDisplay = (
  t: TFunction
): Record<HolidayCalendarStatus, { label: string; status: BadgeProps['status'] }> => ({
  [HolidayCalendarStatus.ACTIVE]: {
    label: t('holiday-calendar:holidayCalendarTable.holidayCalendarStatus.active'),
    status: 'success',
  },
  [HolidayCalendarStatus.INACTIVE]: {
    label: t('holiday-calendar:holidayCalendarTable.holidayCalendarStatus.inactive'),
    status: 'error',
  },
})

const getHolidayCalendarsDayTypeDisplay = (t: TFunction): Record<DayType, { label: string }> => ({
  [DayType.BUSINESS_DAY]: {
    label: t('holiday-calendar:holidayCalendarTable.holidayCalendarDateType.businessDay'),
  },
  [DayType.NON_BUSINESS_DAY]: {
    label: t('holiday-calendar:holidayCalendarTable.holidayCalendarDateType.nonBusinessDay'),
  },
  [DayType.ALL]: {
    label: t('holiday-calendar:holidayCalendarTable.holidayCalendarDateType.all'),
  },
})

const getHolidayCalendarTableColumns = (
  t: TFunction
): TableColumnsType<HolidayCalendarTableRecord> => [
  {
    title: t('holiday-calendar:holidayCalendarTable.columns.titles.date'),
    dataIndex: 'date',
    key: 'date',
    fixed: 'left',
  },
  {
    title: t('holiday-calendar:holidayCalendarTable.columns.titles.name'),
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: t('holiday-calendar:holidayCalendarTable.columns.titles.type'),
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: t('holiday-calendar:holidayCalendarTable.columns.titles.recurring'),
    dataIndex: 'recurring',
    key: 'recurring',
  },
  {
    title: t('holiday-calendar:holidayCalendarTable.columns.titles.status'),
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

const getHolidayCalendarTableRowActions = (
  t: TFunction,
  router: NextRouter,
  calendarId: HolidayCalendar['id']
) => [
  {
    key: 'edit',
    label: t('common:tables.rowActions.edit'),
    onClick: () =>
      router.push({
        pathname: RoutesConsts.getHolidayCalendarRoute(String(calendarId)),
        query: { isInitialModeEdit: true },
      }),
  },
]

interface HolidayCalendarTableRecord
  extends Omit<HolidayCalendar, 'type' | 'recurring' | 'status'>,
    Record<string, unknown> {
  source: HolidayCalendar
  type: ReactNode
  recurring: ReactNode
  status: ReactNode
}

const HolidayCalendars: NextPageWithLayout = () => {
  const [selected, setSelected] = useState<DayType>(DayType.ALL)

  const handleChange = (selectedOption: DayType.ALL) => {
    setSelected(selectedOption)
  }

  const router = useRouter()
  const { t, ready } = useTranslation(['common', 'holiday-calendar'])
  const pagination = usePagination()

  const { getHolidayCalendars } = useHolidayCalendars({
    page: pagination.current,
    size: pagination.pageSize,
    type: selected,
  })

  const isLoading = !ready || getHolidayCalendars.isLoading

  if (isLoading) {
    return <Spin fullscreen />
  }

  const holidayCalendarsStatusDisplay = getHolidayCalendarsStatusDisplay(t)
  const holidayCalendarsDayTypeDisplay = getHolidayCalendarsDayTypeDisplay(t)
  const holidayCalendarsDayTypeDisplayUtils = getHolidayCalendarsDayTypeFilterOptions(t)
  const holidayCalendarTableColumns = getHolidayCalendarTableColumns(t)

  return (
    <div className={styles.holidayCalendars}>
      <Header title={t('holiday-calendar:title')} className={styles.holidayCalendars__header} />
      <Content>
        {getHolidayCalendars.data?.data.length ? (
          <Card
            className={styles.holidayCalendars__contentCard}
            title={t('holiday-calendar:subtitle')}
            extra={
              <>
                <Button
                  icon={<PlusSquareOutlinedIcon />}
                  onClick={() => router.push(RoutesConsts.CreateHolidayCalendar)}
                >
                  {t('holiday-calendar:buttons.addDate')}
                </Button>
              </>
            }
          >
            <p> {t('holiday-calendar:filterByDayType.labelFilter')} </p>
            <Select
              name="filter"
              className={styles.holidayCalendars__select}
              options={holidayCalendarsDayTypeDisplayUtils}
              value={selected}
              onChange={handleChange}
              autoFocus={true}
            />
            <Table<HolidayCalendarTableRecord>
              scroll={{ x: true }}
              columns={holidayCalendarTableColumns}
              pagination={{
                ...pagination,
                total: getHolidayCalendars.data?.totalItems,
                showTotal: (total, range) =>
                  t('common:tables.pagination.totalItems', { from: range[0], to: range[1], total }),
              }}
              dataSource={getHolidayCalendars.data?.data.map(holidayCalendar => ({
                ...holidayCalendar,
                key: holidayCalendar.id,
                source: holidayCalendar,
                date: dateTimeUtils.dateTime(holidayCalendar.date).format(DATE_FORMAT),
                type: holidayCalendarsDayTypeDisplay[holidayCalendar.type].label,
                recurring: holidayCalendar.recurring
                  ? t('holiday-calendar:holidayCalendarTable.holidayCalendarRecurringStatus.Yes')
                  : t('holiday-calendar:holidayCalendarTable.holidayCalendarRecurringStatus.No'),
                status: (
                  <Badge
                    status={holidayCalendarsStatusDisplay[holidayCalendar.status].status}
                    text={holidayCalendarsStatusDisplay[holidayCalendar.status].label}
                  />
                ),
                actions: (
                  <Dropdown
                    menu={{
                      items: getHolidayCalendarTableRowActions(t, router, holidayCalendar.id),
                    }}
                  >
                    <Button type="link">...</Button>
                  </Dropdown>
                ),
              }))}
              onRow={record => ({
                onClick: () => router.push(RoutesConsts.getHolidayCalendarRoute(record.source.id)),
              })}
            />
          </Card>
        ) : (
          <Empty
            className={styles.holidayCalendars__empty}
            image={<EmptyDefaultSvg />}
            description={t('holiday-calendar:empty.noHolidayCalendars')}
          >
            <Button
              type="primary"
              size="large"
              onClick={() => router.push(RoutesConsts.CreateHolidayCalendar)}
            >
              {t('common:buttons.create')}
            </Button>
          </Empty>
        )}
      </Content>
    </div>
  )
}

HolidayCalendars.getLayout = getCoreBankDefaultLayout

export default HolidayCalendars
