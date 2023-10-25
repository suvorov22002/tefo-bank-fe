import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { getUsersResponseMock } from '../api/mocks'
import { useUsers } from './index'

jest.mock('../service', () => ({
  getUsers: jest.fn(() => getUsersResponseMock),
}))

describe('useUsers', () => {
  it('should query users', async () => {
    const { result } = renderHook(() => useUsers({ page: 1, limit: 10 }), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getUsers.isSuccess)

    expect(result.current.getUsers.isFetchedAfterMount).toBe(true)
    expect(result.current.getUsers.data).toBeDefined()
  })
})
