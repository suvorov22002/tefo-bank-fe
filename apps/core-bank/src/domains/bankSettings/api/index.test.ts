import * as bankSettingsApi from '../api'
import { apiClientService } from '../../../services/apiClient'
import {
  getBankSettingsAccessResponseMock,
  getBankSettingsAccountingResponseMock,
  getBankSettingsClosuresResponseMock,
  getBankSettingsCustomersResponseMock,
  getBankSettingsFXPositionResponseMock,
  getBankSettingsGeneralResponseMock,
  getBankSettingsTimeResponseMock,
  getBankSettingsTransactionsResponseMock,
} from './mock'

jest.mock('../../../services/apiClient')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('getBankSettingsAccess', () => {
  it('should use apiClientService get method', async () => {
    await bankSettingsApi.getBankSettingsAccess()

    expect(apiClientService.get).toBeCalled()
  })
})

describe('editBankSettingsAccess', () => {
  it('should use apiClientService put method with proper data', async () => {
    await bankSettingsApi.editBankSettingsAccess(getBankSettingsAccessResponseMock)

    expect(apiClientService.put).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({ body: expect.objectContaining(getBankSettingsAccessResponseMock) })
    )
  })
})

describe('getBankSettingsClosures', () => {
  it('should use apiClientService get method', async () => {
    await bankSettingsApi.getBankSettingsClosures()

    expect(apiClientService.get).toBeCalled()
  })
})

describe('editBankSettingsClosures', () => {
  it('should use apiClientService put method with proper data', async () => {
    await bankSettingsApi.editBankSettingsClosures(getBankSettingsClosuresResponseMock)

    expect(apiClientService.put).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: expect.objectContaining(getBankSettingsClosuresResponseMock),
      })
    )
  })
})

describe('getBankSettingsTime', () => {
  it('should use apiClientService get method', async () => {
    await bankSettingsApi.getBankSettingsTime()

    expect(apiClientService.get).toBeCalled()
  })
})

describe('editBankSettingsTime', () => {
  it('should use apiClientService put method with proper data', async () => {
    await bankSettingsApi.editBankSettingsTime(getBankSettingsTimeResponseMock)

    expect(apiClientService.put).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({ body: expect.objectContaining(getBankSettingsTimeResponseMock) })
    )
  })
})

describe('getBankSettingsGeneral', () => {
  it('should use apiClientService get method', async () => {
    await bankSettingsApi.getBankSettingsGeneral()

    expect(apiClientService.get).toBeCalled()
  })
})

describe('editBankSettingsGeneral', () => {
  it('should use apiClientService put method with proper data', async () => {
    await bankSettingsApi.editBankSettingsGeneral(getBankSettingsGeneralResponseMock)

    expect(apiClientService.put).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({ body: expect.objectContaining(getBankSettingsGeneralResponseMock) })
    )
  })
})

describe('getBankSettingsAccounting', () => {
  it('should use apiClientService get method', async () => {
    await bankSettingsApi.getBankSettingsAccounting()

    expect(apiClientService.get).toBeCalled()
  })
})

describe('editBankSettingsAccounting', () => {
  it('should use apiClientService put method with proper data', async () => {
    await bankSettingsApi.editBankSettingsAccounting(getBankSettingsAccountingResponseMock)

    expect(apiClientService.put).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: expect.objectContaining(getBankSettingsAccountingResponseMock),
      })
    )
  })
})

describe('getAppSettings', () => {
  it('should use apiClientService get method', async () => {
    await bankSettingsApi.getAppSettings()

    expect(apiClientService.get).toBeCalled()
  })
})

describe('getBankSettingsCustomers', () => {
  it('should use apiClientService get method', async () => {
    await bankSettingsApi.getBankSettingsCustomers()

    expect(apiClientService.get).toBeCalled()
  })
})

describe('editBankSettingsCustomers', () => {
  it('should use apiClientService put method with proper data', async () => {
    await bankSettingsApi.editBankSettingsCustomers(getBankSettingsCustomersResponseMock)

    expect(apiClientService.put).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: expect.objectContaining(getBankSettingsCustomersResponseMock),
      })
    )
  })
})

describe('getBankSettingsTransactions', () => {
  it('should use apiClientService get method', async () => {
    await bankSettingsApi.getBankSettingsTransactions()

    expect(apiClientService.get).toBeCalled()
  })
})

describe('editBankSettingsTransactions', () => {
  it('should use apiClientService put method with proper data', async () => {
    await bankSettingsApi.editBankSettingsTransactions(getBankSettingsTransactionsResponseMock)

    expect(apiClientService.put).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: expect.objectContaining(getBankSettingsTransactionsResponseMock),
      })
    )
  })
})

describe('getBankSettingsFXPosition', () => {
  it('should use apiClientService get method', async () => {
    await bankSettingsApi.getBankSettingsFXPosition()

    expect(apiClientService.get).toBeCalled()
  })
})

describe('editBankSettingsFXPosition', () => {
  it('should use apiClientService put method with proper data', async () => {
    await bankSettingsApi.editBankSettingsFXPosition(getBankSettingsFXPositionResponseMock)

    expect(apiClientService.put).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: expect.objectContaining(getBankSettingsFXPositionResponseMock),
      })
    )
  })
})
