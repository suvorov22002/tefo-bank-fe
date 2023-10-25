import * as bankProfileApi from '../api'
import { CreateBankProfileRequestData } from '../types'
import { createBankProfile, getBankProfile } from './index'

jest.mock('../api', () => {
  return {
    createBankProfile: jest.fn(() => Promise.resolve()),
    getBankProfile: jest.fn(() => Promise.resolve({ body: mockData })),
  }
})

const mockData = {
  shortName: 'Bank',
  longName: 'TestBank',
}

describe('createBankProfile', () => {
  it('should call bankProfileApi createBankProfile method', async () => {
    await createBankProfile(mockData as CreateBankProfileRequestData)

    expect(bankProfileApi.createBankProfile).toBeCalled()
    expect(bankProfileApi.createBankProfile).toBeCalledWith(mockData)
  })
})

describe('getBankProfile', () => {
  it('should call bankProfileApi getBankProfileMethod', async () => {
    await getBankProfile()

    expect(bankProfileApi.getBankProfile).toBeCalled()
  })
})
