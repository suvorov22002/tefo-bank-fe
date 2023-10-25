import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { renderHook, waitFor } from '@testing-library/react'

import { getAllCurrenciesResponseMock } from '../api/mock'
import { useAllCurrencies } from './index'

jest.mock('../service', () => ({
  getAllCurrencies: jest.fn(() => getAllCurrenciesResponseMock),
}))

describe('useAllCurrencies', () => {
  it('should query getAllCurrencies', async () => {
    const { result } = renderHook(() => useAllCurrencies(), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getAllCurrencies.isSuccess)

    expect(result.current.getAllCurrencies.isFetchedAfterMount).toBe(true)
  })
})
