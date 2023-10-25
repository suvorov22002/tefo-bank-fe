import { queryClient, useMutation, useQuery } from 'ui'

import * as businessDaysService from '../service'
import { BusinessDaysCacheKeys } from '../consts'

export const useInitialBusinessDay = ({ date }: { date?: string }) => {
  const getInitialBusinessDayAvailableSlots = useQuery({
    queryKey: [BusinessDaysCacheKeys.InitialBusinessDayAvailableSlots, date],
    queryFn: () => businessDaysService.getInitialBusinessDayAvailableSlots(date as string),
    enabled: !!date,
  })

  const setInitialBusinessDay = useMutation({
    mutationFn: (date: string) => businessDaysService.setInitialBusinessDay(date),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [BusinessDaysCacheKeys.OpenBusinessDayDate],
      }),
  })

  return {
    getInitialBusinessDayAvailableSlots,
    setInitialBusinessDay,
  }
}
