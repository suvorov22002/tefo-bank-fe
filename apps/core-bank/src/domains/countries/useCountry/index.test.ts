import { queryClient } from 'ui'
import { act, renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { CountriesCacheKeys } from '../consts'
import { useCountry } from './index'
import { Country, CreateCountryRequestData } from '../types'
import { createCountryRequestDataMock, getCountriesResponseDataMock } from '../api/mock'

jest.mock('../service', () => ({
  getCountry: jest.fn(() => getCountriesResponseDataMock.data[0]),
  editCountry: jest.fn((country: Country) => country),
  createCountry: jest.fn((_data: CreateCountryRequestData) => undefined),
}))

describe('useCountry', () => {
  it('should handle empty configuration argument', async () => {
    const { result } = renderHook(() => useCountry({}), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getCountry.isSuccess)

    expect(result.current.getCountry.isFetchedAfterMount).toBe(false)
    expect(result.current.getCountry.data).not.toBeDefined()
  })

  it('should query country', async () => {
    const { result } = renderHook(() => useCountry({ countryId: '1' }), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getCountry.isSuccess)

    expect(result.current.getCountry.isFetchedAfterMount).toBe(true)
    expect(result.current.getCountry.data).toBeDefined()
  })

  it('should invalidate countries query cache after edit country action', async () => {
    const { result } = renderHook(() => useCountry({}), {
      wrapper: getAppWrapper(),
    })

    jest.spyOn(queryClient, 'invalidateQueries')

    await act(
      async () =>
        await result.current.editCountry.mutateAsync({
          ...getCountriesResponseDataMock.data[0],
          name: 'Country999',
        })
    )

    expect(queryClient.invalidateQueries).toBeCalledWith({
      queryKey: [CountriesCacheKeys.Countries],
    })
  })

  it('should invalidate countries query cache after create country action', async () => {
    const { result } = renderHook(() => useCountry({}), {
      wrapper: getAppWrapper(),
    })

    jest.spyOn(queryClient, 'invalidateQueries')

    await act(
      async () => await result.current.createCountry.mutateAsync(createCountryRequestDataMock)
    )

    expect(queryClient.invalidateQueries).toBeCalledWith({
      queryKey: [CountriesCacheKeys.Countries],
    })
  })
})
