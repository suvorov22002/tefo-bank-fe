import * as bankUnitsApi from '../api'
import { apiClientService } from '../../../services/apiClient'
import { bankUnitMock } from './mock'

jest.mock('../../../services/apiClient')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('getBankUnits', () => {
  it('should use apiClientService get method', async () => {
    await bankUnitsApi.getBankUnits(1, 10)

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('page=1'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('size=10'))
  })
})

describe('getBankUnitsBasicInfo', () => {
  it('should use apiClientService get method', async () => {
    await bankUnitsApi.getBankUnitsBasicInfo()

    expect(apiClientService.get).toBeCalled()
  })
})

describe('getBankUnitEntityLevelTemplate', () => {
  it('should use apiClientService get method', async () => {
    await bankUnitsApi.getBankUnitEntityLevelTemplate()

    expect(apiClientService.get).toBeCalled()
  })
})

describe('getBankUnitTemplate', () => {
  it('should use apiClientService get method with no data', async () => {
    await bankUnitsApi.getBankUnitTemplate()

    expect(apiClientService.get).toBeCalled()
  })

  it('should use apiClientService get method with proper data', async () => {
    await bankUnitsApi.getBankUnitTemplate('templateId123', { unitTypeId: 'unitTypeId123' })

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('templateId123'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('unitTypeId'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('unitTypeId123'))
  })
})

describe('getBankUnit', () => {
  it('should use apiClientService get method with proper data', async () => {
    await bankUnitsApi.getBankUnit('78567839917')

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('78567839917'))
  })
})

describe('createBankUnit', () => {
  it('should use apiClientService post method with proper data', async () => {
    await bankUnitsApi.createBankUnit(bankUnitMock)

    expect(apiClientService.post).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({ body: expect.objectContaining(bankUnitMock) })
    )
  })
})

describe('editBankUnit', () => {
  it('should use apiClientService put method with proper data', async () => {
    await bankUnitsApi.editBankUnit(bankUnitMock)

    expect(apiClientService.put).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({ body: expect.objectContaining(bankUnitMock) })
    )
  })
})
