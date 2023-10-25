import * as customersApi from '../api'
import { GetCustomersResponseData } from '../types'

export const getCustomers = (page: number, limit: number): Promise<GetCustomersResponseData> =>
  customersApi.getCustomers(page, limit).then(({ body }) => body)
