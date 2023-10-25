import { queryClient } from 'ui'
import { act, renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { BankSettingsCacheKeys } from '../consts'
import { BankSettingsTime } from '../types'
import { getBankSettingsTimeResponseMock } from '../api/mock'
import { useBankSettingsTime } from './index'

jest.mock('../service', () => ({
  getBankSettingsTime: jest.fn(() => getBankSettingsTimeResponseMock),
  editBankSettingsTime: jest.fn((data: BankSettingsTime) => data),
}))

describe('useBankSettingsTime', () => {
  it('should query getBankSettingsTime', async () => {
    const { result } = renderHook(() => useBankSettingsTime(), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getBankSettingsTime.isSuccess)

    expect(result.current.getBankSettingsTime.isFetchedAfterMount).toBe(true)
    expect(result.current.getBankSettingsTime.data).toBeDefined()
  })

  it('should mutate getBankSettingsTime cache after editBankSettingsTime', async () => {
    const { result } = renderHook(() => useBankSettingsTime(), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getBankSettingsTime.isSuccess)

    expect(result.current.getBankSettingsTime.data).toBe(getBankSettingsTimeResponseMock)

    await act(
      async () =>
        await result.current.editBankSettingsTime.mutateAsync({
          ...getBankSettingsTimeResponseMock,
          isNonBusinessDaySunday: true,
        })
    )

    expect(queryClient.getQueryData([BankSettingsCacheKeys.BankSettingsTime])).toStrictEqual({
      ...getBankSettingsTimeResponseMock,
      isNonBusinessDaySunday: true,
    })
  })
})
