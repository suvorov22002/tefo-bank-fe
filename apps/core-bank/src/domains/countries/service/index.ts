import { StringifiableRecord } from 'utils'

import * as countriesApi from '../api'
import {
  Country,
  CreateCountryRequestData,
  GetCountriesResponseData,
  GetCountryTemplateResponseData,
} from '../types'

export const getCountries = (page: number, limit: number): Promise<GetCountriesResponseData> =>
  countriesApi.getCountries(page, limit).then(({ body }) => body)

export const getCountryTemplate = (
  templateId?: string,
  query?: StringifiableRecord
): Promise<GetCountryTemplateResponseData> =>
  countriesApi.getCountryTemplate(templateId, query).then(({ body }) => body)

export const getCountry = (countryId: string): Promise<Country> =>
  countriesApi.getCountry(countryId).then(({ body }) => body)

export const editCountry = (data: Country): Promise<Country> =>
  countriesApi.editCountry(data).then(({ body }) => body)

export const createCountry = (data: CreateCountryRequestData): Promise<Country> =>
  countriesApi.createCountry(data).then(({ body }) => body)
