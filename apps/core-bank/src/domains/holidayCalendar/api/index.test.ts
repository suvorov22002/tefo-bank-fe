import * as holidayCalendarApi from '../api'
import { DayType } from '../types'
import { apiClientService } from '../../../services/apiClient'
import { createHolidayCalendarRequestDataMock, getHolidayCalendarsResponseMock } from './mocks'

jest.mock('../../../services/apiClient')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('getHolidayCalendars', () => {
  it('should use apiClientService get method', async () => {
    await holidayCalendarApi.getHolidayCalendars(1, 10, DayType.ALL)

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('page=1'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('size=10'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('type='))
  })
})

describe('getHolidayCalendarsAll', () => {
  it('should use apiClientService get method', async () => {
    await holidayCalendarApi.getHolidayCalendarsAll(DayType.BUSINESS_DAY)

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('BUSINESS_DAY'))
  })
})

describe('getHolidayCalendar', () => {
  it('should use apiClientService get method with proper data', async () => {
    await holidayCalendarApi.getHolidayCalendar('oifjgsdfmkdngdf')

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('oifjgsdfmkdngdf'))
  })
})

describe('editHolidayCalendar', () => {
  it('should use apiClientService put method with proper data', async () => {
    await holidayCalendarApi.editHolidayCalendar(getHolidayCalendarsResponseMock.data[0])

    expect(apiClientService.put).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: expect.objectContaining(getHolidayCalendarsResponseMock.data[0]),
      })
    )
  })
})

describe('createHolidayCalendar', () => {
  it('should use apiClientService post method with proper data', async () => {
    await holidayCalendarApi.createHolidayCalendar(createHolidayCalendarRequestDataMock)

    expect(apiClientService.post).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: expect.objectContaining(createHolidayCalendarRequestDataMock),
      })
    )
  })
})
