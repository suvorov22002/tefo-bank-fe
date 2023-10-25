import { queryClient } from 'ui'
import { act, renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { BankUnitTypesCacheKeys } from '../consts'
import { useAllBankUnitTypes } from '../useAllBankUnitTypes'
import { useBankUnitType } from './index'
import { bankUnitTypesMock, getBankUnitTypesResponseMock } from '../api/mock'

jest.mock('../service', () => {
  return {
    getBankUnitTypes: jest.fn(() => getBankUnitTypesResponseMock),
    getBankUnitType: jest.fn(id => getBankUnitTypesResponseMock.data.find(el => el.id === id)),
    createBankUnitType: jest.fn(unitType => unitType),
    editBankUnitType: jest.fn(unitType => unitType),
    getAllBankUnitTypes: jest.fn(() => bankUnitTypesMock),
  }
})

describe('useBankUnitType', () => {
  it('should not query getBankUnitType if bankUnitType.id is not specified', async () => {
    const { result } = renderHook(() => useBankUnitType({}), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getBankUnitType.isSuccess)

    expect(result.current.getBankUnitType.isFetchedAfterMount).not.toBe(true)
    expect(result.current.getBankUnitType.data).not.toBeDefined()
  })

  it('should query getBankUnitType getBankUnitType if bankUnitType.id is specified', async () => {
    const { result } = renderHook(() => useBankUnitType({ id: '1' }), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getBankUnitType.isSuccess)

    expect(result.current.getBankUnitType.isFetchedAfterMount).toBe(true)
    expect(result.current.getBankUnitType.data).toBeDefined()
  })

  it('should invalidate getBankUnitTypes cache after createBankUnitType action', async () => {
    const { result } = renderHook(() => useBankUnitType({}), {
      wrapper: getAppWrapper(),
    })

    jest.spyOn(queryClient, 'invalidateQueries')

    await act(
      async () =>
        await result.current.createBankUnitType.mutateAsync({
          ...getBankUnitTypesResponseMock.data[0],
        })
    )

    expect(queryClient.invalidateQueries).toBeCalledWith({
      queryKey: [BankUnitTypesCacheKeys.BankUnitTypes],
    })
  })

  it('should invalidate getBankUnitTypes cache after editBankUnitType action', async () => {
    const { result } = renderHook(() => useBankUnitType({}), {
      wrapper: getAppWrapper(),
    })

    await act(
      async () =>
        await result.current.editBankUnitType.mutateAsync({
          ...getBankUnitTypesResponseMock.data[0],
          name: 'testUnitTypeName',
        })
    )

    expect(queryClient.invalidateQueries).toBeCalledWith({
      queryKey: [BankUnitTypesCacheKeys.BankUnitTypes],
    })
  })

  it('should update getAllBankUnitTypes cache after createBankUnitType action', async () => {
    const { result: useBankUnitTypeResult } = renderHook(() => useBankUnitType({}), {
      wrapper: getAppWrapper(),
    })

    const { result: useAllBankUnitTypesResult } = renderHook(() => useAllBankUnitTypes({}), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => useAllBankUnitTypesResult.current.getAllBankUnitTypes.isSuccess)

    await act(
      async () =>
        await useBankUnitTypeResult.current.createBankUnitType.mutateAsync({
          ...getBankUnitTypesResponseMock.data[0],
        })
    )

    expect(queryClient.getQueryData([BankUnitTypesCacheKeys.AllBankUnitTypes])).toContainEqual(
      getBankUnitTypesResponseMock.data[0]
    )
  })
})

it('should update getAllBankUnitTypes cache after editBankUnitType action', async () => {
  const { result: useBankUnitTypeResult } = renderHook(() => useBankUnitType({}), {
    wrapper: getAppWrapper(),
  })

  const { result: useAllBankUnitTypesResult } = renderHook(() => useAllBankUnitTypes({}), {
    wrapper: getAppWrapper(),
  })

  const editBankUnitTypeData = {
    ...getBankUnitTypesResponseMock.data[0],
    name: 'testUnitTypeName',
  }

  await waitFor(() => useAllBankUnitTypesResult.current.getAllBankUnitTypes.isSuccess)

  await act(
    async () =>
      await useBankUnitTypeResult.current.editBankUnitType.mutateAsync(editBankUnitTypeData)
  )

  const allBankUnitTypesQueryData = queryClient.getQueryData([
    BankUnitTypesCacheKeys.AllBankUnitTypes,
  ])

  expect(allBankUnitTypesQueryData).toContainEqual(editBankUnitTypeData)
})
