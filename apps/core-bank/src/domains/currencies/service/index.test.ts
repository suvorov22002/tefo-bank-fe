import * as currencyApi from '../api'
import * as currencyService from './index'
import { createCurrencyRequestDataMock, getCurrenciesResponseMock } from '../api/mock'

jest.mock('../api', () => ({
  getCurrencies: jest.fn(() => Promise.resolve({})),
  getCurrency: jest.fn(() => Promise.resolve({})),
  editCurrency: jest.fn(() => Promise.resolve({})),
  createCurrency: jest.fn(() => Promise.resolve({})),
  getAllCurrencies: jest.fn(() => Promise.resolve({})),
}))

describe('getCurrencies', () => {
  it('should call currencyApi getCurrencies method', async () => {
    await currencyService.getCurrencies(1, 10)

    expect(currencyApi.getCurrencies).toBeCalledTimes(1)
    expect(currencyApi.getCurrencies).toBeCalledWith(1, 10)
  })
})

describe('getCurrency', () => {
  it('should call currencyApi getCurrency method', async () => {
    await currencyService.getCurrency('170')

    expect(currencyApi.getCurrency).toBeCalledWith('170')
  })
})

describe('editCurrency', () => {
  it('should call currencyApi editCurrency method', async () => {
    await currencyService.editCurrency(getCurrenciesResponseMock.data[0])

    expect(currencyApi.editCurrency).toBeCalledWith(getCurrenciesResponseMock.data[0])
  })
})

describe('createCurrency', () => {
  it('should call currencyApi createCurrency method', async () => {
    await currencyService.createCurrency(createCurrencyRequestDataMock)

    expect(currencyApi.createCurrency).toBeCalledWith(createCurrencyRequestDataMock)
  })
})

describe('getAllCurrencies', () => {
  it('should call currencyApi getCurrency method', async () => {
    await currencyService.getAllCurrencies()

    expect(currencyApi.getAllCurrencies).toBeCalled()
  })
})
