import * as countriesApi from '../api'
import { apiClientService } from '../../../services/apiClient'
import { createCountryRequestDataMock, getCountriesResponseDataMock } from './mock'

jest.mock('../../../services/apiClient')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('getCountries', () => {
  it('should use apiClientService get method', async () => {
    await countriesApi.getCountries(1, 10)

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('page=1'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('size=10'))
  })
})

describe('getCountryTemplate', () => {
  it('should use apiClientService get method with no data', async () => {
    await countriesApi.getCountryTemplate()

    expect(apiClientService.get).toBeCalled()
  })

  it('should use apiClientService get method with proper data', async () => {
    await countriesApi.getCountryTemplate('templateId123', { countryId: 'countryId123' })

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('templateId123'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('countryId'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('countryId123'))
  })
})

describe('getCountry', () => {
  it('should use apiClientService get method with proper data', async () => {
    await countriesApi.getCountry('7856783237')

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('7856783237'))
  })
})

describe('editCountry', () => {
  it('should use apiClientService put method with proper data', async () => {
    await countriesApi.editCountry(getCountriesResponseDataMock.data[0])

    expect(apiClientService.put).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: expect.objectContaining(getCountriesResponseDataMock.data[0]),
      })
    )
  })
})

describe('createCountry', () => {
  it('should use apiClientService post method with proper data', async () => {
    await countriesApi.createCountry(createCountryRequestDataMock)

    expect(apiClientService.post).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({ body: expect.objectContaining(createCountryRequestDataMock) })
    )
  })
})
