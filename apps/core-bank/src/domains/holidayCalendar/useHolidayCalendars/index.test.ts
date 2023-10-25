import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { renderHook, waitFor } from '@testing-library/react'

import { DayType } from '../types'
import { createHolidayCalendarRequestDataMock } from '../api/mocks'
import { useHolidayCalendars } from './index'

jest.mock('../service', () => ({
  getHolidayCalendars: jest.fn(() => createHolidayCalendarRequestDataMock),
}))

describe('useHolidayCalendars', () => {
  it('should query getHolidayCalendars', async () => {
    const { result } = renderHook(
      () => useHolidayCalendars({ page: 1, size: 10, type: DayType.ALL }),
      {
        wrapper: getAppWrapper(),
      }
    )

    await waitFor(() => result.current.getHolidayCalendars.isSuccess)

    expect(result.current.getHolidayCalendars.isFetchedAfterMount).toBe(true)
  })
})
