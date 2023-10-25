import * as bankProfileApi from './index'
import { apiClientService } from '../../../services/apiClient'
import { getBankProfileMockResponse } from './mocks'

jest.mock('../../../services/apiClient')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('getBankProfile', () => {
  it('should call apiClientService get method', async () => {
    await bankProfileApi.getBankProfile()

    expect(apiClientService.get).toBeCalled()
  })
})

describe('getBankProfileTemplate', () => {
  it('should call apiClientService get method', async () => {
    await bankProfileApi.getBankProfileTemplate()

    expect(apiClientService.get).toBeCalled()
  })
})

describe('editBankProfile', () => {
  it('should call apiClientService put method', async () => {
    await bankProfileApi.editBankProfile(getBankProfileMockResponse)

    expect(apiClientService.put).toBeCalledWith(expect.any(String), {
      body: getBankProfileMockResponse,
    })
  })
})
