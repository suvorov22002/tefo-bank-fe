import { queryClient, useMutation, useQuery } from 'ui'

import * as holidayCalendarsService from '../service'
import { HolidayCalendarsCacheKeys } from '../consts'
import { CreateHolidayCalendarRequestData, HolidayCalendar } from '../types'

export const useHolidayCalendar = ({ calendarId }: { calendarId?: string }) => {
  const getHolidayCalendar = useQuery({
    queryKey: [HolidayCalendarsCacheKeys.HolidayCalendars, calendarId],
    queryFn: () => holidayCalendarsService.getHolidayCalendar(calendarId as string),
    enabled: !!calendarId,
  })

  const editHolidayCalendar = useMutation({
    mutationFn: (data: HolidayCalendar) => holidayCalendarsService.editHolidayCalendar(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [HolidayCalendarsCacheKeys.HolidayCalendars],
      }),
  })

  const createHolidayCalendar = useMutation({
    mutationFn: (data: CreateHolidayCalendarRequestData) =>
      holidayCalendarsService.createHolidayCalendar(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [HolidayCalendarsCacheKeys.HolidayCalendars],
      }),
  })

  return {
    getHolidayCalendar,
    editHolidayCalendar,
    createHolidayCalendar,
  }
}
