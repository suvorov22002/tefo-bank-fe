import { DateTimeTermType } from 'utils'

import { PeriodTerm } from './types'

export const dateTimePeriodTermMap: Record<PeriodTerm, DateTimeTermType> = {
  [PeriodTerm.Day]: 'day',
  [PeriodTerm.Month]: 'month',
  [PeriodTerm.Quarter]: 'quarter',
  [PeriodTerm.Week]: 'week' as DateTimeTermType,
  [PeriodTerm.Year]: 'year',
}

export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss'
