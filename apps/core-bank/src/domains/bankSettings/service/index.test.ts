import * as bankSettingsApi from '../api'
import * as bankSettingsService from './index'
import {
  getBankSettingsAccessResponseMock,
  getBankSettingsAccountingResponseMock,
  getBankSettingsClosuresResponseMock,
  getBankSettingsCustomersResponseMock,
  getBankSettingsFXPositionResponseMock,
  getBankSettingsGeneralResponseMock,
  getBankSettingsTimeResponseMock,
  getBankSettingsTransactionsResponseMock,
} from '../api/mock'

jest.mock('../api', () => ({
  getBankSettingsGeneral: jest.fn(() => Promise.resolve({})),
  editBankSettingsGeneral: jest.fn(() => Promise.resolve({})),
  getBankSettingsTime: jest.fn(() => Promise.resolve({})),
  editBankSettingsTime: jest.fn(() => Promise.resolve({})),
  getBankSettingsClosures: jest.fn(() => Promise.resolve({})),
  editBankSettingsClosures: jest.fn(() => Promise.resolve({})),
  getBankSettingsAccounting: jest.fn(() => Promise.resolve({})),
  editBankSettingsAccounting: jest.fn(() => Promise.resolve({})),
  getBankSettingsAccess: jest.fn(() => Promise.resolve({})),
  editBankSettingsAccess: jest.fn(() => Promise.resolve({})),
  getAppSettings: jest.fn(() => Promise.resolve({})),
  getBankSettingsCustomers: jest.fn(() => Promise.resolve({})),
  editBankSettingsCustomers: jest.fn(() => Promise.resolve({})),
  getBankSettingsTransactions: jest.fn(() => Promise.resolve({})),
  editBankSettingsTransactions: jest.fn(() => Promise.resolve({})),
  getBankSettingsFXPosition: jest.fn(() => Promise.resolve({})),
  editBankSettingsFXPosition: jest.fn(() => Promise.resolve({})),
}))

describe('getBankSettingsGeneral', () => {
  it('should call bankSettingsApi getBankSettingsGeneral method', async () => {
    await bankSettingsService.getBankSettingsGeneral()

    expect(bankSettingsApi.getBankSettingsGeneral).toBeCalled()
  })
})

describe('editBankSettingsGeneral', () => {
  it('should call bankSettingsApi editBankSettingsGeneral method', async () => {
    await bankSettingsService.editBankSettingsGeneral(getBankSettingsGeneralResponseMock)

    expect(bankSettingsApi.editBankSettingsGeneral).toBeCalledWith(
      getBankSettingsGeneralResponseMock
    )
  })
})

describe('getBankSettingsTime', () => {
  it('should call bankSettingsApi getBankSettingsTime method', async () => {
    await bankSettingsService.getBankSettingsTime()

    expect(bankSettingsApi.getBankSettingsTime).toBeCalled()
  })
})

describe('editBankSettingsTime', () => {
  it('should call bankSettingsApi editBankSettingsTime method', async () => {
    await bankSettingsService.editBankSettingsTime(getBankSettingsTimeResponseMock)

    expect(bankSettingsApi.editBankSettingsTime).toBeCalledWith(getBankSettingsTimeResponseMock)
  })
})

describe('getBankSettingsClosures', () => {
  it('should call bankSettingsApi getBankSettingsClosures method', async () => {
    await bankSettingsService.getBankSettingsClosures()

    expect(bankSettingsApi.getBankSettingsClosures).toBeCalled()
  })
})

describe('editBankSettingsClosures', () => {
  it('should call bankSettingsApi editBankSettingsClosures method', async () => {
    await bankSettingsService.editBankSettingsClosures(getBankSettingsClosuresResponseMock)

    expect(bankSettingsApi.editBankSettingsClosures).toBeCalledWith(
      getBankSettingsClosuresResponseMock
    )
  })
})

describe('getBankSettingsAccounting', () => {
  it('should call bankSettingsApi getBankSettingsAccounting method', async () => {
    await bankSettingsService.getBankSettingsAccounting()

    expect(bankSettingsApi.getBankSettingsAccounting).toBeCalled()
  })
})

describe('editBankSettingsAccounting', () => {
  it('should call bankSettingsApi editBankSettingsAccounting method', async () => {
    await bankSettingsService.editBankSettingsAccounting(getBankSettingsAccountingResponseMock)

    expect(bankSettingsApi.editBankSettingsAccounting).toBeCalledWith(
      getBankSettingsAccountingResponseMock
    )
  })
})

describe('getBankSettingsAccess', () => {
  it('should call bankSettingsApi getBankSettingsAccess method', async () => {
    await bankSettingsService.getBankSettingsAccess()

    expect(bankSettingsApi.getBankSettingsAccess).toBeCalled()
  })
})

describe('editBankSettingsAccess', () => {
  it('should call bankSettingsApi editBankSettingsAccess method', async () => {
    await bankSettingsService.editBankSettingsAccess(getBankSettingsAccessResponseMock)

    expect(bankSettingsApi.editBankSettingsAccess).toBeCalledWith(getBankSettingsAccessResponseMock)
  })
})

describe('getAppSettings', () => {
  it('should call bankSettingsApi getAppSettings method', async () => {
    await bankSettingsService.getAppSettings()

    expect(bankSettingsApi.getAppSettings).toBeCalled()
  })
})

describe('getBankSettingsCustomers', () => {
  it('should call bankSettingsApi getBankSettingsCustomers method', async () => {
    await bankSettingsService.getBankSettingsCustomers()

    expect(bankSettingsApi.getBankSettingsCustomers).toBeCalled()
  })
})

describe('editBankSettingsCustomers', () => {
  it('should call bankSettingsApi editBankSettingsCustomers method', async () => {
    await bankSettingsService.editBankSettingsCustomers(getBankSettingsCustomersResponseMock)

    expect(bankSettingsApi.editBankSettingsCustomers).toBeCalledWith(
      getBankSettingsCustomersResponseMock
    )
  })
})

describe('getBankSettingsTransactions', () => {
  it('should call bankSettingsApi getBankSettingsTransactions method', async () => {
    await bankSettingsService.getBankSettingsTransactions()

    expect(bankSettingsApi.getBankSettingsTransactions).toBeCalled()
  })
})

describe('editBankSettingsTransactions', () => {
  it('should call bankSettingsApi editBankSettingsTransactions method', async () => {
    await bankSettingsService.editBankSettingsTransactions(getBankSettingsTransactionsResponseMock)

    expect(bankSettingsApi.editBankSettingsTransactions).toBeCalledWith(
      getBankSettingsTransactionsResponseMock
    )
  })
})

describe('getBankSettingsFXPosition', () => {
  it('should call bankSettingsApi getBankSettingsFXPosition method', async () => {
    await bankSettingsService.getBankSettingsFXPosition()

    expect(bankSettingsApi.getBankSettingsFXPosition).toBeCalled()
  })
})

describe('editBankSettingsFXPosition', () => {
  it('should call bankSettingsApi editBankSettingsFXPosition method', async () => {
    await bankSettingsService.editBankSettingsFXPosition(getBankSettingsFXPositionResponseMock)

    expect(bankSettingsApi.editBankSettingsFXPosition).toBeCalledWith(
      getBankSettingsFXPositionResponseMock
    )
  })
})
