import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { useAllUsers } from './index'

jest.mock('../service', () => ({
  getAllUsers: jest.fn(() => []),
}))

describe('useAllUsers', () => {
  it('should query all users', async () => {
    const { result } = renderHook(() => useAllUsers({}), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getAllUsers.isSuccess)

    expect(result.current.getAllUsers.isFetchedAfterMount).toBe(true)
    expect(result.current.getAllUsers.data).toBeDefined()
  })

  it('should not query users while shouldQueryAllUsers is false', async () => {
    const { result } = renderHook(() => useAllUsers({ shouldQueryAllUsers: false }), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getAllUsers.isSuccess)

    expect(result.current.getAllUsers.isFetchedAfterMount).toBe(false)
  })
})
