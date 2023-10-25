import { queryString } from 'utils'

import { apiClientService } from '@/services'

import {
  GetInitialBusinessDayAvailableSlotsResponseData,
  GetOpenBusinessDayDateResponseData,
  SetInitialBusinessDayResponseData,
} from '../types'

export const getInitialBusinessDayAvailableSlots = (month: string) =>
  apiClientService.get<GetInitialBusinessDayAvailableSlotsResponseData>(
    queryString.stringifyUrl({
      url: '/core-bank-settings/api/v1.0/business-day/get-available',
      query: {
        month,
      },
    })
  )

export const getOpenBusinessDayDate = () =>
  apiClientService.get<GetOpenBusinessDayDateResponseData>(
    '/core-bank-settings/api/v1.0/business-day/get-open-business-day'
  )

export const setInitialBusinessDay = (date: string) =>
  apiClientService.post<SetInitialBusinessDayResponseData>(
    '/core-bank-settings/api/v1.0/business-day/first',
    {
      body: {
        date,
      },
    }
  )
