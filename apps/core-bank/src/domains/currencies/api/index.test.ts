import * as currencyApi from '../api'
import { apiClientService } from '../../../services/apiClient'
import { createCurrencyRequestDataMock, getCurrenciesResponseMock } from './mock'

jest.mock('../../../services/apiClient')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('getCurrencies', () => {
  it('should use apiClientService get method', async () => {
    await currencyApi.getCurrencies(1, 10)

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('page='))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('size='))
  })
})

describe('getCurrency', () => {
  it('should use apiClientService get method with proper data', async () => {
    await currencyApi.getCurrency('170')

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('170'))
  })
})

describe('editCurrency', () => {
  it('should use apiClientService put method with proper data', async () => {
    const currencyData = getCurrenciesResponseMock.data[0]

    await currencyApi.editCurrency(currencyData)

    expect(apiClientService.put).toBeCalledWith(
      expect.stringContaining(`/dictionary-service/api/v1/currencies/${currencyData.id}`),
      expect.objectContaining({
        body: expect.objectContaining({
          alphabeticCode: currencyData.alphabeticCode,
          name: currencyData.name,
          numberOfDecimals: currencyData.numberOfDecimals,
          numericCode: currencyData.numericCode,
          status: currencyData.status,
          symbol: currencyData.symbol,
          usageInBank: currencyData.usageInBank, // Update to use the actual data
        }),
      })
    )
  })
})

describe('createCurrency', () => {
  it('should use apiClientService post method with proper data', async () => {
    await currencyApi.createCurrency(createCurrencyRequestDataMock)

    expect(apiClientService.post).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: expect.objectContaining(createCurrencyRequestDataMock),
      })
    )
  })
})

describe('getAllCurrencies', () => {
  it('should use apiClientService get method', async () => {
    await currencyApi.getAllCurrencies()

    expect(apiClientService.get).toBeCalledWith(
      expect.stringContaining('/dictionary-service/api/v1/currencies/all')
    )
  })
})
