import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { getCountriesResponseDataMock } from '../api/mock'
import { useCountries } from './index'

jest.mock('../service', () => ({
  getCountries: jest.fn(() => getCountriesResponseDataMock),
}))

describe('useCountries', () => {
  it('should query getCountries', async () => {
    const { result } = renderHook(() => useCountries({ page: 1, limit: 10 }), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getCountries.isSuccess)

    expect(result.current.getCountries.isFetchedAfterMount).toBe(true)
  })
})
