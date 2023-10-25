import { queryString } from 'utils'

import { apiClientService } from '@/services'

import { GetCustomersResponseData } from '../types'

export const getCustomers = (page: number, size: number) =>
  apiClientService.get<GetCustomersResponseData>(
    queryString.stringifyUrl({
      url: '/customer-service/api/v1.0/customers',
      query: {
        page,
        size,
      },
    })
  )
