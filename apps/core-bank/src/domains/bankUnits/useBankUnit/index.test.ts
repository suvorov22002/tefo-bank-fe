import { queryClient } from 'ui'
import { act, renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { BankUnitsCacheKeys } from '../consts'
import { useBankUnit } from './index'
import { CreateBankUnitRequestData, EditBankUnitRequestData } from '../types'
import { bankUnitMock, getBankUnitsResponseMock } from '../api/mock'

jest.mock('../service', () => ({
  getBankUnit: jest.fn(() => bankUnitMock),
  createBankUnit: jest.fn((unit: CreateBankUnitRequestData) => unit),
  getBankUnits: jest.fn(() => getBankUnitsResponseMock),
  editBankUnit: jest.fn((unit: EditBankUnitRequestData) => unit),
}))

describe('useBankUnit', () => {
  it('should handle empty configuration argument', async () => {
    const { result } = renderHook(() => useBankUnit({}), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getBankUnit.isSuccess)
    await waitFor(() => result.current.createBankUnit.isSuccess)

    expect(result.current.getBankUnit.isFetchedAfterMount).toBe(false)
    expect(result.current.getBankUnit.data).not.toBeDefined()
    expect(result.current.createBankUnit.isIdle).toBe(true)
    expect(result.current.createBankUnit.data).not.toBeDefined()
  })

  it('should query bank unit', async () => {
    const { result } = renderHook(() => useBankUnit({ unitId: '1' }), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getBankUnit.isSuccess)
    await waitFor(() => result.current.createBankUnit.isSuccess)

    expect(result.current.getBankUnit.isFetchedAfterMount).toBe(true)
    expect(result.current.getBankUnit.data).toBeDefined()
  })

  it('should invalidate bank units query after create bank unit action', async () => {
    const { result } = renderHook(() => useBankUnit({}), {
      wrapper: getAppWrapper(),
    })

    jest.spyOn(queryClient, 'invalidateQueries')

    await act(async () => await result.current.createBankUnit.mutateAsync(bankUnitMock))

    expect(queryClient.invalidateQueries).toBeCalledWith({
      queryKey: [BankUnitsCacheKeys.BankUnits],
    })
  })

  it('should invalidate bank units query after edit bank unit action', async () => {
    const { result } = renderHook(() => useBankUnit({}), {
      wrapper: getAppWrapper(),
    })

    jest.spyOn(queryClient, 'invalidateQueries')

    await act(
      async () =>
        await result.current.editBankUnit.mutateAsync({
          ...bankUnitMock,
          name: 'Updated name test',
        })
    )

    expect(queryClient.invalidateQueries).toBeCalledWith({
      queryKey: [BankUnitsCacheKeys.BankUnits],
    })
  })
})
