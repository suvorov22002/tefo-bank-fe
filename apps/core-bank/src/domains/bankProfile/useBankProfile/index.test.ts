import { queryClient } from 'ui'
import { act, renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { BankProfileCacheKeys } from '../consts'
import { EditBankProfileRequestData } from '../types'
import { getBankProfileMockResponse } from '../api/mocks'
import { useBankProfile } from './index'

jest.mock('../service', () => {
  return {
    getBankProfile: jest.fn(() => getBankProfileMockResponse),
    editBankProfile: jest.fn((data: EditBankProfileRequestData) => data),
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

  it('should mutate getBankProfile cache after editBankProfile', async () => {
    const { result } = renderHook(() => useBankProfile(), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getBankProfile.isSuccess)

    expect(result.current.getBankProfile.data).toBe(getBankProfileMockResponse)

    await act(
      async () =>
        await result.current.editBankProfileAction.mutateAsync({
          ...getBankProfileMockResponse,
          longName: 'new name',
        })
    )

    expect(queryClient.getQueryData([BankProfileCacheKeys.BankProfile])).toStrictEqual({
      ...getBankProfileMockResponse,
      longName: 'new name',
    })
  })
})
