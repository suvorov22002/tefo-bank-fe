import * as bankProfileApi from '../api'
import { getBankProfileMockResponse } from '../api/mocks'
import { editBankProfile, getBankProfile, getBankProfileTemplate } from './index'

jest.mock('../api', () => {
  return {
    getBankProfile: jest.fn(() => Promise.resolve({})),
    getBankProfileTemplate: jest.fn(() => Promise.resolve({})),
    getBankProfileDefaultTemplate: jest.fn(() => Promise.resolve({})),
    editBankProfile: jest.fn(() => Promise.resolve({})),
  }
})

describe('getBankProfile', () => {
  it('should call bankProfileApi getBankProfile method', async () => {
    await getBankProfile()

    expect(bankProfileApi.getBankProfile).toBeCalled()
  })
})

describe('getBankProfileTemplate', () => {
  it('should call bankProfileApi getBankProfileTemplate method', async () => {
    await getBankProfileTemplate()

    expect(bankProfileApi.getBankProfileTemplate).toBeCalled()
  })
})

describe('editBankProfile', () => {
  it('should call bankProfileApi editBankProfile method', async () => {
    const updatedGetBankProfileMock = {
      ...getBankProfileMockResponse,
      shortName: 'new',
    }

    await editBankProfile(updatedGetBankProfileMock)

    expect(bankProfileApi.editBankProfile).toBeCalledWith(updatedGetBankProfileMock)
  })
})
