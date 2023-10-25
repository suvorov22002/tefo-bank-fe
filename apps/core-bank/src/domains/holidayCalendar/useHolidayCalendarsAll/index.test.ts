import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { renderHook, waitFor } from '@testing-library/react'

import { DayType } from '../types'
import { createHolidayCalendarRequestDataMock } from '../api/mocks'
import { useHolidayCalendarsAll } from './index'

jest.mock('../service', () => ({
  getHolidayCalendarsAll: jest.fn(() => createHolidayCalendarRequestDataMock),
}))

describe('useHolidayCalendarsAll', () => {
  it('should query getHolidayCalendarsAll', async () => {
    const { result } = renderHook(() => useHolidayCalendarsAll({ type: DayType.BUSINESS_DAY }), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getHolidayCalendarsAll.isSuccess)

    expect(result.current.getHolidayCalendarsAll.isFetchedAfterMount).toBe(true)
  })
})
