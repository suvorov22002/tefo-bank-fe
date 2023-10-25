import * as bankUnitTypesApi from '../api'
import * as bankUnitTypesService from '../service'
import { getBankUnitTypeResponseMock } from '../api/mock'

jest.mock('../api', () => ({
  getBankUnitTypes: jest.fn(() => Promise.resolve({})),
  getBankUnitType: jest.fn(() => Promise.resolve({})),
  getBankUnitTypeTemplate: jest.fn(() => Promise.resolve({})),
  createBankUnitType: jest.fn(() => Promise.resolve({})),
  editBankUnitType: jest.fn(() => Promise.resolve({})),
  getAllBankUnitTypes: jest.fn(() => Promise.resolve({})),
  getBankUnitTypesBasicInfo: jest.fn(() => Promise.resolve({})),
}))

describe('getBankUnitTypes', () => {
  it('should call bankUnitTypesApi getBankUnitTypes method', async () => {
    await bankUnitTypesService.getBankUnitTypes(1, 10)

    expect(bankUnitTypesApi.getBankUnitTypes).toBeCalledTimes(1)
    expect(bankUnitTypesApi.getBankUnitTypes).toBeCalledWith(1, 10)
  })
})

describe('getBankUnitType', () => {
  it('should call bankUnitTypesApi getBankUnitType method', async () => {
    await bankUnitTypesService.getBankUnitType('1')

    expect(bankUnitTypesApi.getBankUnitType).toBeCalledWith('1')
  })
})

describe('getBankUnitTypeTemplate', () => {
  it('should call bankUnitTypesApi getBankUnitTypeTemplate method', async () => {
    await bankUnitTypesService.getBankUnitTypeTemplate()

    expect(bankUnitTypesApi.getBankUnitTypeTemplate).toBeCalled()
  })
})

describe('createBankUnitType', () => {
  it('should call bankUnitTypesApi createBankUnitType method', async () => {
    await bankUnitTypesService.createBankUnitType(getBankUnitTypeResponseMock)
    expect(bankUnitTypesApi.createBankUnitType).toBeCalledWith(getBankUnitTypeResponseMock)
  })
})

describe('editBankUnitType', () => {
  it('should call bankUnitTypesApi editBankUnitType method', async () => {
    await bankUnitTypesService.editBankUnitType(getBankUnitTypeResponseMock)
    expect(bankUnitTypesApi.editBankUnitType).toBeCalledWith(getBankUnitTypeResponseMock)
  })
})

describe('getAllBankUnitTypes', () => {
  it('should call bankUnitTypeApi getAllBankUnitTypes method', async () => {
    await bankUnitTypesService.getAllBankUnitTypes()

    expect(bankUnitTypesApi.getAllBankUnitTypes).toBeCalled()
  })
})

describe('getBankUnitTypesBasicInfo', () => {
  it('should call bankUnitTypeApi getAllBankUnitTypes method', async () => {
    await bankUnitTypesService.getBankUnitTypesBasicInfo()

    expect(bankUnitTypesApi.getBankUnitTypesBasicInfo).toBeCalled()
  })
})
