import * as countriesApi from '../api'
import * as countriesService from './index'
import { createCountryRequestDataMock, getCountriesResponseDataMock } from '../api/mock'

jest.mock('../api', () => ({
  getCountries: jest.fn(() => Promise.resolve({})),
  getCountryTemplate: jest.fn(() => Promise.resolve({})),
  getCountry: jest.fn(() => Promise.resolve({})),
  editCountry: jest.fn(() => Promise.resolve({})),
  createCountry: jest.fn(() => Promise.resolve({})),
}))

describe('getCountries', () => {
  it('should call countriesApi getCountries method', async () => {
    await countriesService.getCountries(1, 10)

    expect(countriesApi.getCountries).toBeCalledTimes(1)
    expect(countriesApi.getCountries).toBeCalledWith(1, 10)
  })
})

describe('getCountryTemplate', () => {
  it('should call countriesApi getCountryTemplate method without params', async () => {
    await countriesService.getCountryTemplate()

    expect(countriesApi.getCountryTemplate).toBeCalled()
  })

  it('should call countriesApi getCountryTemplate method with params', async () => {
    await countriesService.getCountryTemplate('templateId123', { param: 'param123' })

    expect(countriesApi.getCountryTemplate).toBeCalledWith('templateId123', {
      param: 'param123',
    })
  })
})

describe('getCountry', () => {
  it('should call countriesApi getCountry method', async () => {
    await countriesService.getCountry('1')

    expect(countriesApi.getCountry).toBeCalledWith('1')
  })
})

describe('editCountry', () => {
  it('should call countriesApi editCountry method', async () => {
    await countriesService.editCountry(getCountriesResponseDataMock.data[0])

    expect(countriesApi.editCountry).toBeCalledWith(getCountriesResponseDataMock.data[0])
  })
})

describe('createCountry', () => {
  it('should call countriesApi createCountry method', async () => {
    await countriesService.createCountry(createCountryRequestDataMock)

    expect(countriesApi.createCountry).toBeCalledWith(createCountryRequestDataMock)
  })
})
