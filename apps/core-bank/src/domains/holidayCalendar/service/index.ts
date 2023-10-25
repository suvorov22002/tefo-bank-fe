import * as holidayCalendarsApi from '../api'
import {
  CreateHolidayCalendarRequestData,
  DayType,
  GetHolidayCalendarsAllResponseData,
  GetHolidayCalendarsResponseData,
  HolidayCalendar,
} from '../types'

export const getHolidayCalendars = (
  page: number,
  size: number,
  type: DayType
): Promise<GetHolidayCalendarsResponseData> =>
  holidayCalendarsApi.getHolidayCalendars(page, size, type).then(({ body }) => body)

export const getHolidayCalendarsAll = (
  type: DayType
): Promise<GetHolidayCalendarsAllResponseData> =>
  holidayCalendarsApi.getHolidayCalendarsAll(type).then(({ body }) => body)

export const getHolidayCalendar = (calendarId: string): Promise<HolidayCalendar> =>
  holidayCalendarsApi.getHolidayCalendar(calendarId).then(({ body }) => body)

export const editHolidayCalendar = (data: HolidayCalendar): Promise<HolidayCalendar> =>
  holidayCalendarsApi.editHolidayCalendar(data).then(({ body }) => body)

export const createHolidayCalendar = (
  data: CreateHolidayCalendarRequestData
): Promise<HolidayCalendar> =>
  holidayCalendarsApi.createHolidayCalendar(data).then(({ body }) => body)
