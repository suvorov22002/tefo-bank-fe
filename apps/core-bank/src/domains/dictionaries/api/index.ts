import { queryString } from 'utils'

import { apiClientService } from '@/services'

import {
  CreateDictionaryValueRequestData,
  CreateUserDictionaryRequestData,
  Dictionary,
  DictionaryValue,
  EditDictionaryValueRequestData,
  GetDictionaryValuesResponseData,
  GetSystemDictionariesResponseData,
  GetUserDictionariesResponseData,
} from '../types'

export const getSystemDictionaries = (page: number, size: number) => {
  const baseUrl = 'dictionary-service/api/v1/dictionaries/system-dictionaries'

  return apiClientService.get<GetSystemDictionariesResponseData>(
    queryString.stringifyUrl({
      url: baseUrl,
      query: {
        page,
        size,
      },
    })
  )
}

export const getUserDictionaries = (page: number, size: number) => {
  const baseUrl = 'dictionary-service/api/v1/dictionaries/user-dictionaries'

  return apiClientService.get<GetUserDictionariesResponseData>(
    queryString.stringifyUrl({
      url: baseUrl,
      query: {
        page,
        size,
      },
    })
  )
}

export const createUserDictionary = (data: CreateUserDictionaryRequestData) => {
  return apiClientService.post<Dictionary>(
    '/dictionary-service/api/v1/dictionaries/user-dictionaries',
    { body: data }
  )
}

export const getDictionary = (dictionaryId: Dictionary['id']) => {
  return apiClientService.get(`/dictionary-service/api/v1/dictionaries/${dictionaryId}`)
}

export const getDictionaryValues = (dictionaryId: Dictionary['id'], page: number, size: number) => {
  const baseUrl = `/dictionary-service/api/v1/dictionaries/${dictionaryId}/values`

  return apiClientService.get<GetDictionaryValuesResponseData>(
    queryString.stringifyUrl({
      url: baseUrl,
      query: {
        page,
        size,
      },
    })
  )
}

export const createDictionaryValue = (
  dictionaryId: Dictionary['id'],
  data: CreateDictionaryValueRequestData
) => {
  return apiClientService.post<DictionaryValue>(
    `/dictionary-service/api/v1/dictionaries/${dictionaryId}/values`,
    {
      body: data,
    }
  )
}

export const getDictionaryValue = (valueId: DictionaryValue['id']) => {
  const baseUrl = '/dictionary-service/api/v1/dictionaries/values'

  return apiClientService.get<DictionaryValue>(
    queryString.stringifyUrl({
      url: baseUrl,
      query: {
        id: valueId,
      },
    })
  )
}

export const editDictionaryValue = (data: EditDictionaryValueRequestData) => {
  const { id, ...rest } = data

  return apiClientService.put<DictionaryValue>(
    `/dictionary-service/api/v1/dictionaries/values/${id}`,
    {
      body: rest,
    }
  )
}

export const getAllDictionaryValuesByDictionaryCode = (dictionaryCode: Dictionary['code']) =>
  apiClientService.get<DictionaryValue[]>(
    queryString.stringifyUrl({
      url: '/dictionary-service/api/v1/dictionaries/values/all',
      query: { dictionaryCode },
    })
  )

export const getAllUserDictionaries = () => {
  return apiClientService.get<Dictionary[]>(
    '/dictionary-service/api/v1/dictionaries/user-dictionaries/all'
  )
}

export const getAllSystemDictionaries = () => {
  return apiClientService.get<Dictionary[]>(
    '/dictionary-service/api/v1/dictionaries/system-dictionaries/all'
  )
}

export const getUserDictionariesBasicInfo = () => {
  return apiClientService.get<Dictionary[]>(
    '/dictionary-service/api/v1/dictionaries/user-dictionaries/basic-info'
  )
}
