import { queryClient } from 'ui'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { act, renderHook, waitFor } from '@testing-library/react'

import { CurrenciesCacheKeys } from '../consts'
import { useCurrency } from './index'
import { CurrencyStatus, CurrencyUsageInBank } from '../types'
import { createCurrencyRequestDataMock, getCurrenciesResponseMock } from '../api/mock'

jest.mock('../service', () => ({
  getCurrency: jest.fn(currencyId => getCurrenciesResponseMock.data.find(c => c.id === currencyId)),
  editCurrency: jest.fn(data => data),
  createCurrency: jest.fn(_data => undefined),
}))

describe('useCurrency', () => {
  it('should handle empty currencyId', async () => {
    const { result } = renderHook(() => useCurrency(), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getCurrency.isSuccess)

    expect(result.current.getCurrency.isFetchedAfterMount).toBe(false)
    expect(result.current.getCurrency.data).toBeUndefined()
  })

  it('should query currency', async () => {
    const currencyId = '5'
    const { result } = renderHook(() => useCurrency(currencyId), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getCurrency.isSuccess)

    expect(result.current.getCurrency.isFetchedAfterMount).toBe(true)
    expect(result.current.getCurrency.data).toBeDefined()
  })

  it('should invalidate currencies query cache after edit currency action', async () => {
    const { result } = renderHook(() => useCurrency(), {
      wrapper: getAppWrapper(),
    })

    jest.spyOn(queryClient, 'invalidateQueries')

    await act(
      async () =>
        await result.current.editCurrency.mutateAsync({
          id: '6',
          name: 'US Dollar',
          symbol: '$',
          alphabeticCode: 'USD',
          numberOfDecimals: 3,
          numericCode: 888,
          status: CurrencyStatus.Active,
          usageInBank: [CurrencyUsageInBank.Cash],
        })
    )

    expect(queryClient.invalidateQueries).toBeCalledWith({
      queryKey: [CurrenciesCacheKeys.Currencies],
    })
  })

  it('should invalidate currencies query cache after create currency action', async () => {
    const { result } = renderHook(() => useCurrency(), {
      wrapper: getAppWrapper(),
    })

    jest.spyOn(queryClient, 'invalidateQueries')

    await act(
      async () => await result.current.createCurrency.mutateAsync(createCurrencyRequestDataMock)
    )

    expect(queryClient.invalidateQueries).toBeCalledWith({
      queryKey: [CurrenciesCacheKeys.Currencies],
    })
  })
})
