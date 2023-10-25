import { queryClient } from 'ui'
import { act, renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { BankSettingsCacheKeys } from '../consts'
import { BankSettingsTransactions } from '../types'
import { getBankSettingsTransactionsResponseMock } from '../api/mock'
import { useBankSettingsTransactions } from './index'

jest.mock('../service', () => ({
  getBankSettingsTransactions: jest.fn(() => getBankSettingsTransactionsResponseMock),
  editBankSettingsTransactions: jest.fn((data: BankSettingsTransactions) => data),
}))

describe('useBankSettingsTransactions', () => {
  it('should query getBankSettingsTransactions', async () => {
    const { result } = renderHook(() => useBankSettingsTransactions(), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getBankSettingsTransactions.isSuccess)

    expect(result.current.getBankSettingsTransactions.isFetchedAfterMount).toBe(true)
    expect(result.current.getBankSettingsTransactions.data).toBeDefined()
  })

  it('should mutate getBankSettingsTransactions cache after editBankSettingsTransactions', async () => {
    const { result } = renderHook(() => useBankSettingsTransactions(), {
      wrapper: getAppWrapper(),
    })

    const data = {
      ...getBankSettingsTransactionsResponseMock,
      transactionNumberLength: 19,
    }

    await waitFor(() => result.current.getBankSettingsTransactions.isSuccess)

    expect(result.current.getBankSettingsTransactions.data).toBe(
      getBankSettingsTransactionsResponseMock
    )

    await act(async () => await result.current.editBankSettingsTransactions.mutateAsync(data))

    expect(
      queryClient.getQueryData([BankSettingsCacheKeys.BankSettingsTransactions])
    ).toStrictEqual(data)
  })
})
