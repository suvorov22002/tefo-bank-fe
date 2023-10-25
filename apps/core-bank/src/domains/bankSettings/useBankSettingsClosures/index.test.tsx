import { queryClient } from 'ui'
import { act, renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { BankSettingsCacheKeys } from '../consts'
import { BankSettingsClosures } from '../types'
import { getBankSettingsClosuresResponseMock } from '../api/mock'
import { useBankSettingsClosures } from './index'

jest.mock('../service', () => ({
  getBankSettingsClosures: jest.fn(() => getBankSettingsClosuresResponseMock),
  editBankSettingsClosures: jest.fn((data: BankSettingsClosures) => data),
}))

describe('useBankSettingsClosures', () => {
  it('should query getBankSettingsClosures', async () => {
    const { result } = renderHook(() => useBankSettingsClosures(), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getBankSettingsClosures.isSuccess)

    expect(result.current.getBankSettingsClosures.isFetchedAfterMount).toBe(true)
    expect(result.current.getBankSettingsClosures.data).toBeDefined()
  })

  it('should mutate getBankSettingsClosures cache after editBankSettingsClosures', async () => {
    const { result } = renderHook(() => useBankSettingsClosures(), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getBankSettingsClosures.isSuccess)

    expect(result.current.getBankSettingsClosures.data).toBe(getBankSettingsClosuresResponseMock)

    await act(
      async () =>
        await result.current.editBankSettingsClosures.mutateAsync({
          ...getBankSettingsClosuresResponseMock,
          shouldBlockUsersDuringEOD: false,
        })
    )

    expect(queryClient.getQueryData([BankSettingsCacheKeys.BankSettingsClosures])).toStrictEqual({
      ...getBankSettingsClosuresResponseMock,
      shouldBlockUsersDuringEOD: false,
    })
  })
})
