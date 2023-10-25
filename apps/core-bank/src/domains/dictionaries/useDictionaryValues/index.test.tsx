import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { useDictionaryValues } from './index'

jest.mock('../service', () => ({
  getDictionaryValues: jest.fn(() => []),
}))

describe('useDictionary', () => {
  it('should query dictionary values', async () => {
    const { result } = renderHook(
      () => useDictionaryValues({ dictionaryId: 1, page: 1, limit: 10 }),
      {
        wrapper: getAppWrapper(),
      }
    )

    await waitFor(() => result.current.getDictionaryValues.isSuccess)

    expect(result.current.getDictionaryValues.isFetchedAfterMount).toBe(true)
    expect(result.current.getDictionaryValues.data).toBeDefined()
  })
})
