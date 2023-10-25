import { queryClient } from 'ui'
import { act, renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { BankSettingsAccess } from '../types'
import { BankSettingsCacheKeys } from '../consts'
import { getBankSettingsAccessResponseMock } from '../api/mock'
import { useBankSettingsAccess } from './index'

jest.mock('../service', () => ({
  getBankSettingsAccess: jest.fn(() => getBankSettingsAccessResponseMock),
  editBankSettingsAccess: jest.fn((data: BankSettingsAccess) => data),
}))

describe('useBankSettingsAccess', () => {
  it('should query getBankSettingsAccess', async () => {
    const { result } = renderHook(() => useBankSettingsAccess(), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getBankSettingsAccess.isSuccess)

    expect(result.current.getBankSettingsAccess.isFetchedAfterMount).toBe(true)
    expect(result.current.getBankSettingsAccess.data).toBeDefined()
  })

  it('should mutate getBankSettingsAccess cache after editBankSettingsAccess', async () => {
    const { result } = renderHook(() => useBankSettingsAccess(), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getBankSettingsAccess.isSuccess)

    expect(result.current.getBankSettingsAccess.data).toBe(getBankSettingsAccessResponseMock)

    await act(
      async () =>
        await result.current.editBankSettingsAccess.mutateAsync({
          ...getBankSettingsAccessResponseMock,
          shouldEnableTwoFactorAuthentication: true,
        })
    )

    expect(queryClient.getQueryData([BankSettingsCacheKeys.BankSettingsAccess])).toStrictEqual({
      ...getBankSettingsAccessResponseMock,
      shouldEnableTwoFactorAuthentication: true,
    })
  })
})
