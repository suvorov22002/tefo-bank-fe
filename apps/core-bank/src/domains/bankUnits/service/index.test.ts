import * as bankUnitsApi from '../api'
import * as bankUnitsService from './index'
import { bankUnitMock } from '../api/mock'

jest.mock('../api', () => ({
  getBankUnits: jest.fn(() => Promise.resolve({})),
  getBankUnitsBasicInfo: jest.fn(() => Promise.resolve({})),
  getBankUnitEntityLevelTemplate: jest.fn(() => Promise.resolve({})),
  getBankUnitTemplate: jest.fn(() => Promise.resolve({})),
  getBankUnit: jest.fn(() => Promise.resolve({})),
  createBankUnit: jest.fn(() => Promise.resolve({})),
  editBankUnit: jest.fn(() => Promise.resolve({})),
}))

describe('getBankUnits', () => {
  it('should call bankUnitsApi getBankUnits method', async () => {
    await bankUnitsService.getBankUnits(1, 10)

    expect(bankUnitsApi.getBankUnits).toBeCalledTimes(1)
    expect(bankUnitsApi.getBankUnits).toBeCalledWith(1, 10)
  })
})

describe('getBankUnitsBasicInfo', () => {
  it('should call bankUnitsApi getBankUnitsBasicInfo method', async () => {
    await bankUnitsService.getBankUnitsBasicInfo()

    expect(bankUnitsApi.getBankUnitsBasicInfo).toBeCalled()
  })
})

describe('getBankUnitEntityLevelTemplate', () => {
  it('should call bankUnitsApi getBankUnitEntityLevelTemplate method', async () => {
    await bankUnitsService.getBankUnitEntityLevelTemplate()

    expect(bankUnitsApi.getBankUnitEntityLevelTemplate).toBeCalled()
  })
})

describe('getBankUnitTemplate', () => {
  it('should call bankUnitsApi getBankUnitTemplate method without params', async () => {
    await bankUnitsService.getBankUnitTemplate()

    expect(bankUnitsApi.getBankUnitTemplate).toBeCalled()
  })

  it('should call bankUnitsApi getBankUnitTemplate method with params', async () => {
    await bankUnitsService.getBankUnitTemplate('templateId123', { unitTypeId: 'unitTypeId123' })

    expect(bankUnitsApi.getBankUnitTemplate).toBeCalledWith('templateId123', {
      unitTypeId: 'unitTypeId123',
    })
  })
})

describe('getBankUnit', () => {
  it('should call bankUnitsApi getBankUnit method', async () => {
    await bankUnitsService.getBankUnit('1')

    expect(bankUnitsApi.getBankUnit).toBeCalledWith('1')
  })
})

describe('createBankUnit', () => {
  it('should call bankUnitsApi createBankUnit method', async () => {
    await bankUnitsService.createBankUnit(bankUnitMock)

    expect(bankUnitsApi.createBankUnit).toBeCalledWith(bankUnitMock)
  })
})

describe('editBankUnit', () => {
  it('should call bankUnitsApi editBankUnit method', async () => {
    await bankUnitsService.editBankUnit(bankUnitMock)

    expect(bankUnitsApi.editBankUnit).toBeCalledWith(bankUnitMock)
  })
})
