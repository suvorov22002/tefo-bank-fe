import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import objectSupport from 'dayjs/plugin/objectSupport'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import dayjs, { QUnitType } from 'dayjs'

dayjs.extend(objectSupport)
dayjs.extend(quarterOfYear)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

export type DateTime = dayjs.Dayjs

export type DateTimeTermType = QUnitType

export const dateTimeUtils = {
  dateTime: dayjs,
}
