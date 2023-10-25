import * as currencyApi from '../api'
import { CreateCurrencyRequestData, Currency, GetCurrenciesResponseData } from '../types'

export const getCurrencies = (page: number, limit: number): Promise<GetCurrenciesResponseData> =>
  currencyApi.getCurrencies(page, limit).then(({ body }) => body)

export const getCurrency = (id: string): Promise<Currency> =>
  currencyApi.getCurrency(id).then(({ body }) => body)

export const createCurrency = (data: CreateCurrencyRequestData): Promise<Currency> =>
  currencyApi.createCurrency(data).then(({ body }) => body)

export const editCurrency = (data: Currency): Promise<Currency> =>
  currencyApi.editCurrency(data).then(({ body }) => body)

export const getAllCurrencies = (): Promise<Currency[]> =>
  currencyApi.getAllCurrencies().then(({ body }) => body)
