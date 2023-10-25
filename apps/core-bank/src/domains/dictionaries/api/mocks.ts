import {
  CreateDictionaryValueRequestData,
  DictionaryStatuses,
  DictionaryTypes,
  DictionaryValueStatuses,
  EditDictionaryValueRequestData,
} from '../types'

export const dictionariesMock = new Array(78).fill(null).map((_, i) => ({
  id: i,
  code: `country_code_${i}`,
  name: `country_${i}`,
  status: i % 3 === 0 ? DictionaryStatuses.Active : DictionaryStatuses.Inactive,
  type: i % 2 === 0 ? DictionaryTypes.System : DictionaryTypes.User,
}))

export const systemDictionariesMock = dictionariesMock.filter(
  dictionary => dictionary.type === DictionaryTypes.System
)

export const userDictionariesMock = dictionariesMock.filter(
  dictionary => dictionary.type === DictionaryTypes.User
)

export const getDictionaryValuesMock = (dictionaryId: string) =>
  new Array(78).fill(null).map((_, i) => ({
    dictionaryId,
    id: i,
    name: `value_${i}`,
    code: `value_code_${i}`,
    status: i % 2 === 0 ? DictionaryValueStatuses.Active : DictionaryValueStatuses.Inactive,
    index: i + 1,
  }))

export const createDictionaryValueMock: CreateDictionaryValueRequestData = {
  name: 'testDictionaryName3',
  code: 'testDictionaryCode3',
  status: DictionaryValueStatuses.Inactive,
}

export const editDictionaryValueMock: EditDictionaryValueRequestData = {
  id: 1,
  name: 'testDictionaryName3',
  code: 'testDictionaryCode3',
  status: DictionaryValueStatuses.Inactive,
}
