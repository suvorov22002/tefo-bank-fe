import * as bankUnitTypeApi from '../api'
import { apiClientService } from '../../../services/apiClient'
import { getBankUnitTypeResponseMock } from './mock'

jest.mock('../../../services/apiClient')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('getBankUnitTypes', () => {
  it('should use apiClientService get method', async () => {
    await bankUnitTypeApi.getBankUnitTypes(1, 10)

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('page=1'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('size=10'))
  })
})

describe('getBankUnitType', () => {
  it('should use apiClientService get method', async () => {
    await bankUnitTypeApi.getBankUnitType('testId')

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('testId'))
  })
})

describe('getBankUnitTypeTemplate', () => {
  it('should use apiClientService get method', async () => {
    await bankUnitTypeApi.getBankUnitTypeTemplate()

    expect(apiClientService.get).toBeCalled()
  })
})

describe('createBankUnitType', () => {
  it('should use apiClientService post method with proper data', async () => {
    await bankUnitTypeApi.createBankUnitType(getBankUnitTypeResponseMock)

    expect(apiClientService.post).toBeCalledWith(expect.any(String), {
      body: getBankUnitTypeResponseMock,
    })
  })
})

describe('editBankUnitType', () => {
  it('should use apiClientService post method with proper data', async () => {
    await bankUnitTypeApi.editBankUnitType(getBankUnitTypeResponseMock)

    const { id, ...rest } = getBankUnitTypeResponseMock

    expect(apiClientService.put).toBeCalledWith(expect.stringContaining(id), {
      body: rest,
    })
  })
})

describe('getAllBankUnitTypes', () => {
  it('should use apiClientService get method', async () => {
    await bankUnitTypeApi.getAllBankUnitTypes()

    expect(apiClientService.get).toBeCalled()
  })
})

describe('getBankUnitTypesBasicInfo', () => {
  it('should use apiClientService get method', async () => {
    await bankUnitTypeApi.getBankUnitTypesBasicInfo()

    expect(apiClientService.get).toBeCalled()
  })
})
