import { Paginated } from '@/types'

export enum HolidayCalendarStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum DayType {
  BUSINESS_DAY = 'BUSINESS_DAY',
  NON_BUSINESS_DAY = 'NON_BUSINESS_DAY',
  ALL = '',
}

export interface HolidayCalendar {
  id: string
  date: string
  name: string
  type: DayType
  recurring: boolean
  status: HolidayCalendarStatus
}

export interface GetHolidayCalendarsResponseData extends Paginated<HolidayCalendar[]> {}

export interface GetHolidayCalendarsAllResponseData extends HolidayCalendar {}

export interface CreateHolidayCalendarRequestData extends HolidayCalendar {}

export interface EditHolidayCalendarRequestData extends HolidayCalendar {}
