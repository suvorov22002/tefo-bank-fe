import { queryClient } from 'ui'
import { act, renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { BankSettingsCacheKeys } from '../consts'
import { BankSettingsCustomers } from '../types'
import { getBankSettingsCustomersResponseMock } from '../api/mock'
import { useBankSettingsCustomers } from './index'

jest.mock('../service', () => ({
  getBankSettingsCustomers: jest.fn(() => getBankSettingsCustomersResponseMock),
  editBankSettingsCustomers: jest.fn((data: BankSettingsCustomers) => data),
}))

describe('useBankSettingsCustomers', () => {
  it('should query getBankSettingsCustomers', async () => {
    const { result } = renderHook(() => useBankSettingsCustomers(), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getBankSettingsCustomers.isSuccess)

    expect(result.current.getBankSettingsCustomers.isFetchedAfterMount).toBe(true)
    expect(result.current.getBankSettingsCustomers.data).toBeDefined()
  })

  it('should mutate getBankSettingsCustomers cache after editBankSettingsCustomers', async () => {
    const { result } = renderHook(() => useBankSettingsCustomers(), {
      wrapper: getAppWrapper(),
    })

    const data = {
      ...getBankSettingsCustomersResponseMock,
      internalCodeLength: 19,
    }

    await waitFor(() => result.current.getBankSettingsCustomers.isSuccess)

    expect(result.current.getBankSettingsCustomers.data).toBe(getBankSettingsCustomersResponseMock)

    await act(async () => await result.current.editBankSettingsCustomers.mutateAsync(data))

    expect(queryClient.getQueryData([BankSettingsCacheKeys.BankSettingsCustomers])).toStrictEqual(
      data
    )
  })
})
