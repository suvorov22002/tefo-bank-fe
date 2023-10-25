import { useOpenBusinessDay } from '@/domains/businessDays'

import { CurrentBusinessDay } from './currentBusinessDay'
import { SetInitialBusinessDay } from './setInitialBusinessDay'

export const BusinessDay = () => {
  const { getOpenBusinessDayDate } = useOpenBusinessDay()
  const refetchOpenBusinessDayDateData = getOpenBusinessDayDate.refetch

  if (getOpenBusinessDayDate.isLoading) {
    return null
  }

  return getOpenBusinessDayDate.data?.date ? (
    <CurrentBusinessDay
      businessDay={getOpenBusinessDayDate.data.date}
      refetchOpenBusinessDayDateData={refetchOpenBusinessDayDateData}
    />
  ) : (
    <SetInitialBusinessDay />
  )
}
