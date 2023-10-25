import { useQuery } from 'ui'

import * as holidayCalendarsService from '../service'
import { DayType } from '../types'
import { HolidayCalendarsCacheKeys } from '../consts'

export const useHolidayCalendars = ({
  page,
  size,
  type,
}: {
  page: number
  size: number
  type: DayType
}) => {
  const getHolidayCalendars = useQuery({
    queryKey: [HolidayCalendarsCacheKeys.HolidayCalendars, page, size, type],
    queryFn: () => holidayCalendarsService.getHolidayCalendars(page, size, type),
  })

  return {
    getHolidayCalendars,
  }
}
