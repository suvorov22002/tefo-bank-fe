import * as dictionariesApi from './index'
import { DictionaryCodeConsts } from '../types'
import { apiClientService } from '../../../services/apiClient'
import { createDictionaryValueMock, dictionariesMock, editDictionaryValueMock } from './mocks'

jest.mock('../../../services/apiClient')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('createUserDictionary', () => {
  it('should call apiClientService post method', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, type, ...rest } = dictionariesMock[0]

    await dictionariesApi.createUserDictionary(rest)

    expect(apiClientService.post).toBeCalledWith(expect.any(String), {
      body: rest,
    })
  })
})

describe('getUserDictionaries', () => {
  it('should call apiClientService get method', async () => {
    await dictionariesApi.getUserDictionaries(1, 10)

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('page=1'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('size=10'))
  })
})

describe('getSystemDictionaries', () => {
  it('should call apiClientService get method', async () => {
    await dictionariesApi.getSystemDictionaries(1, 10)

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('page=1'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('size=10'))
  })
})

describe('getDictionaryValues', () => {
  it('should call apiClientService get method', async () => {
    await dictionariesApi.getDictionaryValues(1, 1, 10)

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('page=1'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('size=10'))
  })
})

describe('createDictionaryValue', () => {
  it('should use apiClientService post method with proper data', async () => {
    await dictionariesApi.createDictionaryValue(1, createDictionaryValueMock)

    expect(apiClientService.post).toBeCalledWith(expect.stringContaining('1'), {
      body: createDictionaryValueMock,
    })
  })
})

describe('getDictionaryValue', () => {
  it('should use apiClientService get method with proper data', async () => {
    await dictionariesApi.getDictionaryValue(1)

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('1'))
  })
})

describe('editDictionaryValue', () => {
  it('should use apiClientService put method with proper data', async () => {
    await dictionariesApi.editDictionaryValue(editDictionaryValueMock)

    const { id, ...rest } = editDictionaryValueMock

    expect(apiClientService.put).toBeCalledWith(expect.stringContaining(String(id)), {
      body: rest,
    })
  })
})

describe('getAllDictionaryValuesByDictionaryCode', () => {
  it('should use apiClientService get method', async () => {
    await dictionariesApi.getAllDictionaryValuesByDictionaryCode(
      DictionaryCodeConsts.AccountingMethod
    )

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('dictionaryCode'))
    expect(apiClientService.get).toBeCalledWith(
      expect.stringContaining(DictionaryCodeConsts.AccountingMethod)
    )
  })
})

describe('getAllSystemDictionaries', () => {
  it('should use apiClientService get method', async () => {
    await dictionariesApi.getAllSystemDictionaries()

    expect(apiClientService.get).toBeCalled()
  })
})

describe('getAllUserDictionaries', () => {
  it('should use apiClientService get method', async () => {
    await dictionariesApi.getAllUserDictionaries()

    expect(apiClientService.get).toBeCalled()
  })
})

describe('getUserDictionariesBasicInfo', () => {
  it('should use apiClientService get method', async () => {
    await dictionariesApi.getUserDictionariesBasicInfo()

    expect(apiClientService.get).toBeCalled()
  })
})
