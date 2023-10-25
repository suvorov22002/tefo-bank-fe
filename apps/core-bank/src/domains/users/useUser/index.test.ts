import { queryClient } from 'ui'
import { act, renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { UsersCacheKeys } from '../consts'
import { resetUserPassword } from '../service'
import { useUser } from './index'
import { CreateUserRequestData, EditUserRequestData } from '../types'
import { createUserMock, getUserResponseMock, getUsersResponseMock } from '../api/mocks'

jest.mock('../service', () => ({
  createUser: jest.fn((user: CreateUserRequestData) => user),
  getUser: jest.fn(_id => getUsersResponseMock.data[0]),
  editUserDetails: jest.fn((user: EditUserRequestData) => user),
  resetUserPassword: jest.fn(),
}))

describe('useUser', () => {
  it('should handle empty configuration argument', async () => {
    const { result } = renderHook(() => useUser({}), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getUser.isSuccess)
    await waitFor(() => result.current.createUser.isSuccess)

    expect(result.current.getUser.isFetchedAfterMount).toBe(false)
    expect(result.current.getUser.data).not.toBeDefined()
    expect(result.current.createUser.isIdle).toBe(true)
    expect(result.current.createUser.data).not.toBeDefined()
  })

  it('should query user', async () => {
    const { result } = renderHook(() => useUser({ userId: '1' }), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getUser.isSuccess)
    await waitFor(() => result.current.createUser.isSuccess)

    expect(result.current.getUser.isFetchedAfterMount).toBe(true)
    expect(result.current.getUser.data).toBeDefined()
  })

  it('should invalidate getUsers data after createUser action', async () => {
    const { result } = renderHook(() => useUser({}), {
      wrapper: getAppWrapper(),
    })

    jest.spyOn(queryClient, 'invalidateQueries')

    await act(async () => await result.current.createUser.mutateAsync(createUserMock))

    expect(queryClient.invalidateQueries).toBeCalledWith({
      queryKey: [UsersCacheKeys.Users],
    })
  })

  it('should mutate getUsers data after editUserDetails action', async () => {
    const { result } = renderHook(() => useUser({}), {
      wrapper: getAppWrapper(),
    })

    jest.spyOn(queryClient, 'invalidateQueries')

    await act(async () => await result.current.editUserDetails.mutateAsync(getUserResponseMock))

    expect(queryClient.invalidateQueries).toBeCalledWith({
      queryKey: [UsersCacheKeys.Users],
    })
  })

  it('should reset user password', async () => {
    const { result: useUserResult } = renderHook(() => useUser({ userId: '1' }), {
      wrapper: getAppWrapper(),
    })

    await act(async () => await useUserResult.current.resetUserPassword.mutateAsync())

    await waitFor(() => useUserResult.current.resetUserPassword.isSuccess)

    expect(resetUserPassword).toBeCalled()
  })
})
