import { useQuery } from 'ui'

import * as businessDaysService from '../service'
import { BusinessDaysCacheKeys } from '../consts'

export const useOpenBusinessDay = () => {
  const getOpenBusinessDayDate = useQuery({
    queryKey: [BusinessDaysCacheKeys.OpenBusinessDayDate],
    queryFn: () => businessDaysService.getOpenBusinessDayDate(),
  })

  return {
    getOpenBusinessDayDate,
  }
}
