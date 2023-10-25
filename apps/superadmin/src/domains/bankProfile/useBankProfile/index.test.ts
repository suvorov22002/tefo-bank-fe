import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { getBankProfileMockResponse } from '../api/mocks'
import { useBankProfile } from './index'

jest.mock('../service', () => {
  return {
    getBankProfile: jest.fn(() => getBankProfileMockResponse),
  }
})

describe('useBankProfile', () => {
  it('should query getBankProfile', async () => {
    const { result } = renderHook(() => useBankProfile(), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getBankProfile.isSuccess)

    expect(result.current.getBankProfile.isFetchedAfterMount).toBe(true)
    expect(result.current.getBankProfile.data).toBe(getBankProfileMockResponse)
  })
})
