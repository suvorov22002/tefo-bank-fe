import { StringifiableRecord, queryString } from 'utils'

import { apiClientService } from '@/services'

import {
  Country,
  CreateCountryRequestData,
  GetCountriesResponseData,
  GetCountryTemplateResponseData,
} from '../types'

export const getCountries = (page: number, size: number) =>
  apiClientService.get<GetCountriesResponseData>(
    queryString.stringifyUrl({
      url: '/dictionary-service/api/v1/countries',
      query: {
        page,
        size,
      },
    })
  )

// TODO: Refactor country default template handling according to BE changes along with other template calls
export const getCountryTemplate = (templateId = 'default', query?: StringifiableRecord) => {
  const baseUrl = '/dictionary-service/api/v1/countries/templates'

  return apiClientService.get<GetCountryTemplateResponseData>(
    queryString.stringifyUrl({
      url: templateId ? baseUrl + `/${templateId}` : baseUrl,
      query,
    })
  )
}

export const getCountry = (id: string) =>
  apiClientService.get<Country>(`/dictionary-service/api/v1/countries/${id}`)

export const editCountry = (data: Country) =>
  apiClientService.put<Country>(`/dictionary-service/api/v1/countries/${data.id}`, {
    body: data,
  })

export const createCountry = (data: CreateCountryRequestData) =>
  apiClientService.post<Country>('/dictionary-service/api/v1/countries', {
    body: data,
  })
