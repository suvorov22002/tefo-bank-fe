import { queryString } from 'utils'

import { apiClientService } from '@/services'

import {
  CreateHolidayCalendarRequestData,
  DayType,
  GetHolidayCalendarsAllResponseData,
  GetHolidayCalendarsResponseData,
  HolidayCalendar,
} from '../types'

export const getHolidayCalendars = (page: number, size: number, type: DayType) =>
  apiClientService.get<GetHolidayCalendarsResponseData>(
    queryString.stringifyUrl({
      url: `/core-bank-settings/api/v1.0/holiday-calendar-day`,
      query: {
        page,
        size,
        type,
      },
    })
  )

export const getHolidayCalendarsAll = (type: DayType) =>
  apiClientService.get<GetHolidayCalendarsAllResponseData>(
    queryString.stringifyUrl({
      url: `/core-bank-settings/api/v1.0/holiday-calendar-day/all?type=${type}`,
      query: {
        type,
      },
    })
  )

export const getHolidayCalendar = (calendarId: string) =>
  apiClientService.get<HolidayCalendar>(
    `/core-bank-settings/api/v1.0/holiday-calendar-day/${calendarId}`
  )

export const editHolidayCalendar = (data: HolidayCalendar) =>
  apiClientService.put<HolidayCalendar>(
    `/core-bank-settings/api/v1.0/holiday-calendar-day/${data.id}`,
    {
      body: data,
    }
  )

export const createHolidayCalendar = (data: CreateHolidayCalendarRequestData) =>
  apiClientService.post<HolidayCalendar>('/core-bank-settings/api/v1.0/holiday-calendar-day', {
    body: data,
  })
