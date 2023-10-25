import * as dictionariesApi from '../api'
import {
  CreateDictionaryValueRequestData,
  CreateUserDictionaryRequestData,
  Dictionary,
  DictionaryValue,
  EditDictionaryValueRequestData,
} from '../types'

export const getSystemDictionaries = (page: number, limit: number) => {
  return dictionariesApi.getSystemDictionaries(page, limit).then(({ body }) => body)
}

export const getUserDictionaries = (page: number, limit: number) => {
  return dictionariesApi.getUserDictionaries(page, limit).then(({ body }) => body)
}

export const createUserDictionary = (data: CreateUserDictionaryRequestData) => {
  return dictionariesApi.createUserDictionary(data).then(({ body }) => body)
}

export const getDictionary = (dictionaryId: Dictionary['id']) => {
  return dictionariesApi.getDictionary(dictionaryId).then(({ body }) => body)
}

export const getDictionaryValues = (
  dictionaryId: Dictionary['id'],
  page: number,
  limit: number
) => {
  return dictionariesApi.getDictionaryValues(dictionaryId, page, limit).then(({ body }) => body)
}

export const createDictionaryValue = (
  dictionaryId: Dictionary['id'],
  data: CreateDictionaryValueRequestData
): Promise<DictionaryValue> => {
  return dictionariesApi.createDictionaryValue(dictionaryId, data).then(({ body }) => body)
}

export const getDictionaryValue = (valueId: DictionaryValue['id']): Promise<DictionaryValue> => {
  return dictionariesApi.getDictionaryValue(valueId).then(({ body }) => body)
}

export const editDictionaryValue = (
  data: EditDictionaryValueRequestData
): Promise<DictionaryValue> => {
  return dictionariesApi.editDictionaryValue(data).then(({ body }) => body)
}

export const getAllDictionaryValuesByDictionaryCode = (
  dictionaryCode: Dictionary['code']
): Promise<DictionaryValue[]> =>
  dictionariesApi.getAllDictionaryValuesByDictionaryCode(dictionaryCode).then(({ body }) => body)

export const getAllDictionaries = async () => {
  const [userDictionariesResponse, systemDictionariesResponse] = await Promise.all([
    dictionariesApi.getUserDictionariesBasicInfo(),
    dictionariesApi.getAllSystemDictionaries(),
  ])

  return [...userDictionariesResponse.body, ...systemDictionariesResponse.body]
}
