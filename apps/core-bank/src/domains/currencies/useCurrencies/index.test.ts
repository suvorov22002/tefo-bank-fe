import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { renderHook, waitFor } from '@testing-library/react'

import { getCurrenciesResponseMock } from '../api/mock'
import { useCurrencies } from './index'

jest.mock('../service', () => ({
  getCurrencies: jest.fn(() => getCurrenciesResponseMock),
}))

describe('useCurrencies', () => {
  it('should query getCurrencies', async () => {
    const { result } = renderHook(() => useCurrencies({ page: 1, limit: 10 }), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getCurrencies.isSuccess)

    expect(result.current.getCurrencies.isFetchedAfterMount).toBe(true)
  })
})
