import * as businessDaysApi from '../api'

jest.mock('../api', () => ({
  getInitialBusinessDayAvailableSlots: jest.fn(() => Promise.resolve({})),
  getOpenBusinessDayDate: jest.fn(() => Promise.resolve({})),
  setInitialBusinessDay: jest.fn(() => Promise.resolve({})),
}))

describe('getInitialBusinessDayAvailableSlots', () => {
  it('should call businessDaysApi getInitialBusinessDayAvailableSlots method', async () => {
    businessDaysApi.getInitialBusinessDayAvailableSlots('2023-09-18T00:00:00')

    expect(businessDaysApi.getInitialBusinessDayAvailableSlots).toBeCalledWith(
      '2023-09-18T00:00:00'
    )
  })
})

describe('getOpenBusinessDayDate', () => {
  it('should call businessDaysApi getOpenBusinessDayDate method', async () => {
    businessDaysApi.getOpenBusinessDayDate()

    expect(businessDaysApi.getInitialBusinessDayAvailableSlots).toBeCalled()
  })
})

describe('setInitialBusinessDay', () => {
  it('should call businessDaysApi setInitialBusinessDay method', async () => {
    businessDaysApi.setInitialBusinessDay('2023-09-19T00:00:00')

    expect(businessDaysApi.setInitialBusinessDay).toBeCalledWith('2023-09-19T00:00:00')
  })
})
