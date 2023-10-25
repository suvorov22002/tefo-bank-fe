import { TFunction } from '@/i18n'
import { DayType, HolidayCalendarStatus } from '@/domains/holidayCalendar'

export const DATE_FORMAT = 'DD.MM.YYYY'

export const getHolidayCalendarsStatusOptions = (t: TFunction) => [
  {
    label: t('holiday-calendar:holidayCalendarTable.holidayCalendarStatus.active'),
    value: HolidayCalendarStatus.ACTIVE,
  },
  {
    label: t('holiday-calendar:holidayCalendarTable.holidayCalendarStatus.inactive'),
    value: HolidayCalendarStatus.INACTIVE,
  },
]

export const getHolidayCalendarsDayTypeOptions = (t: TFunction) => [
  {
    label: t('holiday-calendar:holidayCalendarTable.holidayCalendarDateType.businessDay'),
    value: DayType.BUSINESS_DAY,
  },
  {
    label: t('holiday-calendar:holidayCalendarTable.holidayCalendarDateType.nonBusinessDay'),
    value: DayType.NON_BUSINESS_DAY,
  },
]

export const getHolidayCalendarsDayTypeFilterOptions = (t: TFunction) => [
  {
    label: t('holiday-calendar:holidayCalendarTable.holidayCalendarDateType.businessDay'),
    value: DayType.BUSINESS_DAY,
  },
  {
    label: t('holiday-calendar:holidayCalendarTable.holidayCalendarDateType.nonBusinessDay'),
    value: DayType.NON_BUSINESS_DAY,
  },
  {
    label: t('holiday-calendar:holidayCalendarTable.holidayCalendarDateType.all'),
    value: DayType.ALL,
  },
]
