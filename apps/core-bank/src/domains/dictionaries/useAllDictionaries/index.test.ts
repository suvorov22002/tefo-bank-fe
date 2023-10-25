import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { useAllDictionaries } from './index'

jest.mock('../service', () => ({
  getAllDictionaries: jest.fn(() => []),
}))

describe('useAllDictionaries', () => {
  it('should query dictionaries', async () => {
    const { result } = renderHook(() => useAllDictionaries({}), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getAllDictionaries.isSuccess)

    expect(result.current.getAllDictionaries.isFetchedAfterMount).toBe(true)
    expect(result.current.getAllDictionaries.data).toBeDefined()
  })

  it('should not query dictionaries while shouldQueryAllDictionaries is false', async () => {
    const { result } = renderHook(
      () =>
        useAllDictionaries({
          shouldQueryAllDictionaries: false,
        }),
      {
        wrapper: getAppWrapper(),
      }
    )

    await waitFor(() => result.current.getAllDictionaries.isSuccess)

    expect(result.current.getAllDictionaries.isFetchedAfterMount).toBe(false)
  })
})
