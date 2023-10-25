import * as customersApi from '../api'
import * as customersService from './index'

jest.mock('../api', () => ({
  getCustomers: jest.fn(() => Promise.resolve({})),
}))

describe('getCustomers', () => {
  it('should call customersApi getCustomers method', async () => {
    await customersService.getCustomers(2, 20)

    expect(customersApi.getCustomers).toBeCalledTimes(1)
    expect(customersApi.getCustomers).toBeCalledWith(2, 20)
  })
})
