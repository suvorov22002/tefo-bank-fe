import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { useUserDictionaries } from './index'
import { userDictionariesMock } from '../api/mocks'

jest.mock('../service', () => ({
  getUserDictionaries: jest.fn(() => userDictionariesMock),
}))

describe('useUserDictionaries', () => {
  it('should query user dictionaries', async () => {
    const { result } = renderHook(() => useUserDictionaries({ page: 1, limit: 10 }), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getUserDictionaries.isSuccess)

    expect(result.current.getUserDictionaries.isFetchedAfterMount).toBe(true)
    expect(result.current.getUserDictionaries.data).toBeDefined()
  })
})
