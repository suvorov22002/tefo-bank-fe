import * as customersApi from '../api'
import { apiClientService } from '../../../services/apiClient'

jest.mock('../../../services/apiClient')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('getCustomers', () => {
  it('should use apiClientService get method', async () => {
    await customersApi.getCustomers(2, 20)

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('page=2'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('size=20'))
  })
})
