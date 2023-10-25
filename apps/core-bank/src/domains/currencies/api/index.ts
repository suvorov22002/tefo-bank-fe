import { queryString } from 'utils'

import { apiClientService } from '@/services'

import { CreateCurrencyRequestData, Currency, GetCurrenciesResponseData } from '../types'

export const getCurrencies = (page: number, size: number) =>
  apiClientService.get<GetCurrenciesResponseData>(
    queryString.stringifyUrl({
      url: '/dictionary-service/api/v1/currencies',
      query: {
        page,
        size,
      },
    })
  )

export const getCurrency = (id: string) => {
  return apiClientService.get<Currency>(`/dictionary-service/api/v1/currencies/${id}`)
}

export const createCurrency = (data: CreateCurrencyRequestData) => {
  return apiClientService.post<Currency>('/dictionary-service/api/v1/currencies', {
    body: data,
  })
}

export const editCurrency = (data: Currency) =>
  apiClientService.put<Currency>(`/dictionary-service/api/v1/currencies/${data.id}`, {
    body: data,
  })

export const getAllCurrencies = () => {
  return apiClientService.get<Currency[]>('/dictionary-service/api/v1/currencies/all')
}
