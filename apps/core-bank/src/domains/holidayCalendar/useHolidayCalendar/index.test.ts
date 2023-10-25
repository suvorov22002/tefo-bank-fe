import { queryClient } from 'ui'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { act, renderHook, waitFor } from '@testing-library/react'

import { HolidayCalendarsCacheKeys } from '../consts'
import { useHolidayCalendar } from './index'
import { CreateHolidayCalendarRequestData, HolidayCalendar } from '../types'
import { createHolidayCalendarRequestDataMock, getHolidayCalendarsResponseMock } from '../api/mocks'

jest.mock('../service', () => ({
  getHolidayCalendar: jest.fn(() => getHolidayCalendarsResponseMock.data[0]),
  editHolidayCalendar: jest.fn((holidayCalendar: HolidayCalendar) => holidayCalendar),
  createHolidayCalendar: jest.fn((_data: CreateHolidayCalendarRequestData) => undefined),
}))

describe('useHolidayCalendar', () => {
  it('should handle empty configuration argument', async () => {
    const { result } = renderHook(() => useHolidayCalendar({}), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getHolidayCalendar.isSuccess)

    expect(result.current.getHolidayCalendar.isFetchedAfterMount).toBe(false)
    expect(result.current.getHolidayCalendar.data).not.toBeDefined()
  })

  it('should query holidayCalendar', async () => {
    const { result } = renderHook(() => useHolidayCalendar({ calendarId: 'oifjgsdfmkdngdf' }), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getHolidayCalendar.isSuccess)

    expect(result.current.getHolidayCalendar.isFetchedAfterMount).toBe(true)
    expect(result.current.getHolidayCalendar.data).toBeDefined()
  })

  it('should invalidate holiday calendar query cache after edit holidayCalendar action', async () => {
    const { result } = renderHook(() => useHolidayCalendar({}), {
      wrapper: getAppWrapper(),
    })

    jest.spyOn(queryClient, 'invalidateQueries')

    await act(
      async () =>
        await result.current.editHolidayCalendar.mutateAsync({
          ...getHolidayCalendarsResponseMock.data[0],
          name: 'Day 000',
        })
    )

    expect(queryClient.invalidateQueries).toBeCalledWith({
      queryKey: [HolidayCalendarsCacheKeys.HolidayCalendars],
    })
  })

  it('should invalidate holiday calendar query cache after create holidayCalendar action', async () => {
    const { result } = renderHook(() => useHolidayCalendar({}), {
      wrapper: getAppWrapper(),
    })

    jest.spyOn(queryClient, 'invalidateQueries')

    await act(
      async () =>
        await result.current.createHolidayCalendar.mutateAsync(createHolidayCalendarRequestDataMock)
    )

    expect(queryClient.invalidateQueries).toBeCalledWith({
      queryKey: [HolidayCalendarsCacheKeys.HolidayCalendars],
    })
  })
})
