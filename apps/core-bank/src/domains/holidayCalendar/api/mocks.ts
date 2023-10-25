import {
  CreateHolidayCalendarRequestData,
  DayType,
  GetHolidayCalendarsResponseData,
  HolidayCalendarStatus,
} from '../types'

export const statusOptionsMock = [
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Inactive', value: 'INACTIVE' },
]

export const recurringOptionsMock = [
  { label: 'No', value: 1 },
  { label: 'Yes', value: 2 },
]

export const getHolidayCalendarsResponseMock: GetHolidayCalendarsResponseData = {
  page: 1,
  limit: 10,
  totalItems: 3,
  data: [
    {
      id: 'oifjgsdfmkdngdf',
      date: '20-09-2023',
      name: 'Day 1',
      type: DayType.BUSINESS_DAY,
      recurring: true,
      status: HolidayCalendarStatus.INACTIVE,
    },
    {
      id: 'coicmsfjshmdsfd',
      date: '10-04-2023',
      name: 'Day 2',
      type: DayType.NON_BUSINESS_DAY,
      recurring: false,
      status: HolidayCalendarStatus.INACTIVE,
    },
    {
      id: 'azeiojzakzzkazkl',
      date: '20-05-2023',
      name: 'Day 3',
      type: DayType.NON_BUSINESS_DAY,
      recurring: true,
      status: HolidayCalendarStatus.INACTIVE,
    },
  ],
}

export const createHolidayCalendarRequestDataMock: CreateHolidayCalendarRequestData = {
  id: 'oifjgsdfmkdngdf',
  date: '10-04-2023',
  name: 'Day 1',
  type: DayType.BUSINESS_DAY,
  recurring: true,
  status: HolidayCalendarStatus.INACTIVE,
}
