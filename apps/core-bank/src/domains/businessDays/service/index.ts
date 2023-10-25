import * as businessDaysApi from '../api'
import {
  GetInitialBusinessDayAvailableSlotsResponseData,
  GetOpenBusinessDayDateResponseData,
  SetInitialBusinessDayResponseData,
} from '../types'

export const getInitialBusinessDayAvailableSlots = (
  month: string
): Promise<GetInitialBusinessDayAvailableSlotsResponseData> =>
  businessDaysApi.getInitialBusinessDayAvailableSlots(month).then(({ body }) => body)

export const getOpenBusinessDayDate = (): Promise<GetOpenBusinessDayDateResponseData> =>
  businessDaysApi.getOpenBusinessDayDate().then(({ body }) => body)

export const setInitialBusinessDay = (date: string): Promise<SetInitialBusinessDayResponseData> =>
  businessDaysApi.setInitialBusinessDay(date).then(({ body }) => body)
