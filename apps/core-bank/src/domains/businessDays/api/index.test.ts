import * as businessDaysApi from '../api'
import { apiClientService } from '../../../services/apiClient'

jest.mock('../../../services/apiClient')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('getInitialBusinessDayAvailableSlots', () => {
  it('should use apiClientService get method', async () => {
    await businessDaysApi.getInitialBusinessDayAvailableSlots('2023-09-18T00:00:00')

    expect(apiClientService.get).toBeCalledWith(
      expect.stringContaining('month=2023-09-18T00%3A00%3A00')
    )
  })
})

describe('getOpenBusinessDayDate', () => {
  it('should use apiClientService get method', async () => {
    await businessDaysApi.getOpenBusinessDayDate()

    expect(apiClientService.get).toBeCalled()
  })
})

describe('setInitialBusinessDay', () => {
  it('should use apiClientService post method', async () => {
    await businessDaysApi.setInitialBusinessDay('2023-09-19T00:00:00')

    expect(apiClientService.post).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({ body: expect.objectContaining({ date: '2023-09-19T00:00:00' }) })
    )
  })
})
