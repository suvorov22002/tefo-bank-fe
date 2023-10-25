import * as holidayCalendarApi from '../api'
import * as holidayCalendarService from './index'
import { DayType } from '../types'
import { createHolidayCalendarRequestDataMock, getHolidayCalendarsResponseMock } from '../api/mocks'

jest.mock('../api', () => ({
  getHolidayCalendars: jest.fn(() => Promise.resolve({})),
  getHolidayCalendarsAll: jest.fn(() => Promise.resolve({})),
  getHolidayCalendar: jest.fn(() => Promise.resolve({})),
  editHolidayCalendar: jest.fn(() => Promise.resolve({})),
  createHolidayCalendar: jest.fn(() => Promise.resolve({})),
}))

describe('getHolidayCalendars', () => {
  it('should call holidayCalendarApi getHolidayCalendars method', async () => {
    await holidayCalendarService.getHolidayCalendars(1, 10, DayType.ALL)

    expect(holidayCalendarApi.getHolidayCalendars).toBeCalledTimes(1)
    expect(holidayCalendarApi.getHolidayCalendars).toBeCalledWith(1, 10, DayType.ALL)
  })
})

describe('getHolidayCalendarsAll', () => {
  it('should call holidayCalendarApi getHolidayCalendarsAll method', async () => {
    await holidayCalendarService.getHolidayCalendarsAll(DayType.BUSINESS_DAY)

    expect(holidayCalendarApi.getHolidayCalendarsAll).toBeCalledTimes(1)
    expect(holidayCalendarApi.getHolidayCalendarsAll).toBeCalledWith(DayType.BUSINESS_DAY)
  })
})

describe('getHolidayCalendar', () => {
  it('should call holidayCalendarApi getHolidayCalendar method', async () => {
    await holidayCalendarService.getHolidayCalendar('oifjgsdfmkdngdf')

    expect(holidayCalendarApi.getHolidayCalendar).toBeCalledWith('oifjgsdfmkdngdf')
  })
})

describe('editHolidayCalendar', () => {
  it('should call holidayCalendarApi editHolidayCalendar method', async () => {
    await holidayCalendarService.editHolidayCalendar(getHolidayCalendarsResponseMock.data[0])

    expect(holidayCalendarApi.editHolidayCalendar).toBeCalledWith(
      getHolidayCalendarsResponseMock.data[0]
    )
  })
})

describe('createHolidayCalendar', () => {
  it('should call holidayCalendarApi createHolidayCalendar method', async () => {
    await holidayCalendarService.createHolidayCalendar(createHolidayCalendarRequestDataMock)

    expect(holidayCalendarApi.createHolidayCalendar).toBeCalledWith(
      createHolidayCalendarRequestDataMock
    )
  })
})
