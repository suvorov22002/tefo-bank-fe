import { CreateBankProfileRequestData } from '../types'
import { apiClientService } from '../../../services/apiClient'
import { createBankProfile, getBankProfile } from './index'

const mockData = {
  shortName: 'Bank',
  longName: 'testBank',
}

jest.mock('../../../services/apiClient', () => {
  return {
    apiClientService: {
      post: jest.fn(() => undefined),
      get: jest.fn(() => undefined),
    },
  }
})

describe('createBankProfile', () => {
  it('should call apiClient post method', async () => {
    await createBankProfile(mockData as CreateBankProfileRequestData)

    expect(apiClientService.post).toBeCalled()
    expect(apiClientService.post).toBeCalledWith(expect.any(String), { body: mockData })
  })
})

describe('getBankProfile', () => {
  it('should call apiClient get method', async () => {
    await getBankProfile()

    expect(apiClientService.get).toBeCalled()
  })
})
