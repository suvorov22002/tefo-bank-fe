import * as dictionariesApi from '../api'
import { DictionaryCodeConsts } from '../types'
import {
  createDictionaryValue,
  createUserDictionary,
  editDictionaryValue,
  getAllDictionaries,
  getAllDictionaryValuesByDictionaryCode,
  getDictionary,
  getDictionaryValue,
  getDictionaryValues,
  getSystemDictionaries,
  getUserDictionaries,
} from './index'
import { createDictionaryValueMock, dictionariesMock, editDictionaryValueMock } from '../api/mocks'

jest.mock('../api', () => ({
  getSystemDictionaries: jest.fn(() => Promise.resolve({})),
  getUserDictionaries: jest.fn(() => Promise.resolve({})),
  createUserDictionary: jest.fn(() => Promise.resolve({})),
  getDictionary: jest.fn(() => Promise.resolve({})),
  getDictionaryValues: jest.fn(() => Promise.resolve({})),
  getAllDictionaryValuesByDictionaryCode: jest.fn(() => Promise.resolve({})),
  createDictionaryValue: jest.fn(() => Promise.resolve({})),
  getDictionaryValue: jest.fn(() => Promise.resolve({})),
  editDictionaryValue: jest.fn(() => Promise.resolve({})),
  getAllUserDictionaries: jest.fn(() => Promise.resolve({ body: [] })),
  getAllSystemDictionaries: jest.fn(() => Promise.resolve({ body: [] })),
  getUserDictionariesBasicInfo: jest.fn(() => Promise.resolve({ body: [] })),
}))

describe('getSystemDictionaries', () => {
  it('should call dictionariesApi getSystemDictionaries method with correct args', async () => {
    await getSystemDictionaries(1, 10)

    expect(dictionariesApi.getSystemDictionaries).toBeCalledWith(1, 10)
  })
})

describe('getUserDictionaries', () => {
  it('should call dictionariesApi getUserDictionaries method with correct args', async () => {
    await getUserDictionaries(1, 10)

    expect(dictionariesApi.getUserDictionaries).toBeCalledWith(1, 10)
  })
})

describe('createUserDictionary', () => {
  it('should call dictionariesApi createUserDictionary method with correct args', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, type, ...createDictionaryData } = dictionariesMock[0]

    await createUserDictionary(createDictionaryData)

    expect(dictionariesApi.createUserDictionary).toBeCalledWith(createDictionaryData)
  })
})

describe('getDictionary', () => {
  it('should call dictionariesApi getDictionary method', async () => {
    await getDictionary(1)

    expect(dictionariesApi.getDictionary).toBeCalledWith(1)
  })
})

describe('getDictionaryValues', () => {
  it('should call dictionariesApi getDictionaryValues method', async () => {
    await getDictionaryValues(1, 1, 10)

    expect(dictionariesApi.getDictionaryValues).toBeCalledWith(1, 1, 10)
  })
})

describe('createDictionaryValue', () => {
  it('should call dictionariesApi createDictionaryValue method', async () => {
    await createDictionaryValue(1, createDictionaryValueMock)

    expect(dictionariesApi.createDictionaryValue).toBeCalledWith(1, createDictionaryValueMock)
  })
})

describe('getDictionaryValue', () => {
  it('should call dictionariesApi getDictionaryValue method', async () => {
    await getDictionaryValue(1)

    expect(dictionariesApi.getDictionaryValue).toBeCalledWith(1)
  })
})

describe('editDictionaryValue', () => {
  it('should call dictionariesApi editDictionaryValue method', async () => {
    await editDictionaryValue(editDictionaryValueMock)

    expect(dictionariesApi.editDictionaryValue).toBeCalledWith(editDictionaryValueMock)
  })
})

describe('getAllDictionaryValuesByDictionaryCode', () => {
  it('should call dictionariesApi getAllDictionaryValuesByDictionaryCode method', async () => {
    await getAllDictionaryValuesByDictionaryCode(DictionaryCodeConsts.AccountingMethod)

    expect(dictionariesApi.getAllDictionaryValuesByDictionaryCode).toBeCalledWith(
      DictionaryCodeConsts.AccountingMethod
    )
  })
})

describe('getAllDictionaries', () => {
  it('should call dictionariesApi getAllSystemDictionaries and getAllUserDictionaries methods', async () => {
    await getAllDictionaries()

    expect(dictionariesApi.getUserDictionariesBasicInfo).toBeCalled()
    expect(dictionariesApi.getAllSystemDictionaries).toBeCalled()
  })
})
