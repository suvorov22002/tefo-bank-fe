import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { useSystemDictionaries } from '.'

jest.mock('../service', () => ({
  getSystemDictionaries: jest.fn(() => []),
}))

describe('useSystemDictionaries', () => {
  it('should query system dictionaries', async () => {
    const { result } = renderHook(() => useSystemDictionaries({ page: 1, limit: 10 }), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getSystemDictionaries.isSuccess)

    expect(result.current.getSystemDictionaries.isFetchedAfterMount).toBe(true)
    expect(result.current.getSystemDictionaries.data).toBeDefined()
  })
})
