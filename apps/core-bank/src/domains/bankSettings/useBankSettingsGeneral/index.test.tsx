import { queryClient } from 'ui'
import { act, renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { BankSettingsCacheKeys } from '../consts'
import { BankSettingsGeneral } from '../types'
import { getBankSettingsGeneralResponseMock } from '../api/mock'
import { useBankSettingsGeneral } from './index'

jest.mock('../service', () => ({
  getBankSettingsGeneral: jest.fn(() => getBankSettingsGeneralResponseMock),
  editBankSettingsGeneral: jest.fn((data: BankSettingsGeneral) => data),
}))

describe('useBankSettingsGeneral', () => {
  it('should query getBankSettingsGeneral', async () => {
    const { result } = renderHook(() => useBankSettingsGeneral(), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getBankSettingsGeneral.isSuccess)

    expect(result.current.getBankSettingsGeneral.isFetchedAfterMount).toBe(true)
    expect(result.current.getBankSettingsGeneral.data).toBeDefined()
  })

  it('should mutate getBankSettingsGeneral cache after editBankSettingsGeneral', async () => {
    const { result } = renderHook(() => useBankSettingsGeneral(), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getBankSettingsGeneral.isSuccess)

    expect(result.current.getBankSettingsGeneral.data).toBe(getBankSettingsGeneralResponseMock)

    await act(
      async () =>
        await result.current.editBankSettingsGeneral.mutateAsync({
          ...getBankSettingsGeneralResponseMock,
          defaultLanguageDictionaryValueId: 3,
        })
    )

    expect(queryClient.getQueryData([BankSettingsCacheKeys.BankSettingsGeneral])).toStrictEqual({
      ...getBankSettingsGeneralResponseMock,
      defaultLanguageDictionaryValueId: 3,
    })
  })

  it('should invalidate app settings cache after editBankSettingsGeneral', async () => {
    const { result } = renderHook(() => useBankSettingsGeneral(), {
      wrapper: getAppWrapper(),
    })

    jest.spyOn(queryClient, 'invalidateQueries')

    await act(
      async () =>
        await result.current.editBankSettingsGeneral.mutateAsync({
          ...getBankSettingsGeneralResponseMock,
          defaultLanguageDictionaryValueId: 3,
        })
    )

    expect(queryClient.invalidateQueries).toBeCalledWith({
      queryKey: [BankSettingsCacheKeys.AppSettings],
    })
  })
})
