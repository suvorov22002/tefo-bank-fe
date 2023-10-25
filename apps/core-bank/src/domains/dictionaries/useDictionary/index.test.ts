import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { useDictionary } from './index'

jest.mock('../service', () => ({
  getDictionary: jest.fn(() => ({})),
}))

describe('useDictionary', () => {
  it('should query dictionary', async () => {
    const { result } = renderHook(() => useDictionary(1), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getDictionary.isSuccess)

    expect(result.current.getDictionary.isFetchedAfterMount).toBe(true)
    expect(result.current.getDictionary.data).toBeDefined()
  })
})
