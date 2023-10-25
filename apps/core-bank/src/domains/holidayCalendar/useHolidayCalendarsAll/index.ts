import { useQuery } from 'ui'

import * as holidayCalendarsService from '../service'
import { DayType } from '../types'
import { HolidayCalendarsCacheKeys } from '../consts'

export const useHolidayCalendarsAll = ({ type }: { type: DayType }) => {
  const getHolidayCalendarsAll = useQuery({
    queryKey: [HolidayCalendarsCacheKeys.HolidayCalendars, type],
    queryFn: () => holidayCalendarsService.getHolidayCalendarsAll(type),
  })

  return {
    getHolidayCalendarsAll,
  }
}
