import { queryClient } from 'ui'
import { act, renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { BankSettingsAccounting } from '../types'
import { BankSettingsCacheKeys } from '../consts'
import { getBankSettingsAccountingResponseMock } from '../api/mock'
import { useBankSettingsAccounting } from './index'

jest.mock('../service', () => ({
  getBankSettingsAccounting: jest.fn(() => getBankSettingsAccountingResponseMock),
  editBankSettingsAccounting: jest.fn((data: BankSettingsAccounting) => data),
}))

describe('useBankSettingsAccounting', () => {
  it('should query getBankSettingsAccounting', async () => {
    const { result } = renderHook(() => useBankSettingsAccounting(), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getBankSettingsAccounting.isSuccess)

    expect(result.current.getBankSettingsAccounting.isFetchedAfterMount).toBe(true)
    expect(result.current.getBankSettingsAccounting.data).toBeDefined()
  })

  it('should mutate getBankSettingsAccounting cache after editBankSettingsAccounting', async () => {
    const { result } = renderHook(() => useBankSettingsAccounting(), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getBankSettingsAccounting.isSuccess)

    expect(result.current.getBankSettingsAccounting.data).toBe(
      getBankSettingsAccountingResponseMock
    )

    await act(
      async () =>
        await result.current.editBankSettingsAccounting.mutateAsync({
          ...getBankSettingsAccountingResponseMock,
          accountingMethodDictionaryValueId: 3,
        })
    )

    expect(queryClient.getQueryData([BankSettingsCacheKeys.BankSettingsAccounting])).toStrictEqual({
      ...getBankSettingsAccountingResponseMock,
      accountingMethodDictionaryValueId: 3,
    })
  })
})
