import { queryClient } from 'ui'
import { act, renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { BankSettingsCacheKeys } from '../consts'
import { BankSettingsFXPosition } from '../types'
import { getBankSettingsFXPositionResponseMock } from '../api/mock'
import { useBankSettingsFXPosition } from './index'

jest.mock('../service', () => ({
  getBankSettingsFXPosition: jest.fn(() => getBankSettingsFXPositionResponseMock),
  editBankSettingsFXPosition: jest.fn((data: BankSettingsFXPosition) => data),
}))

describe('useBankSettingsFXPosition', () => {
  it('should query getBankSettingsFXPosition', async () => {
    const { result } = renderHook(() => useBankSettingsFXPosition(), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getBankSettingsFXPosition.isSuccess)

    expect(result.current.getBankSettingsFXPosition.isFetchedAfterMount).toBe(true)
    expect(result.current.getBankSettingsFXPosition.data).toBeDefined()
  })

  it('should mutate getBankSettingsFXPosition cache after editBankSettingsFXPosition', async () => {
    const { result } = renderHook(() => useBankSettingsFXPosition(), {
      wrapper: getAppWrapper(),
    })

    const data = {
      ...getBankSettingsFXPositionResponseMock,
      FXRateType: '23',
    }

    await waitFor(() => result.current.getBankSettingsFXPosition.isSuccess)

    expect(result.current.getBankSettingsFXPosition.data).toBe(
      getBankSettingsFXPositionResponseMock
    )

    await act(async () => await result.current.editBankSettingsFXPosition.mutateAsync(data))

    expect(queryClient.getQueryData([BankSettingsCacheKeys.BankSettingsFXPosition])).toStrictEqual(
      data
    )
  })
})
