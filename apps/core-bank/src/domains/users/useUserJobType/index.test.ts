import { queryClient } from 'ui'
import { act, renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { UsersCacheKeys } from '../consts'
import { getUserJobTypesResponseMock } from '../api/mocks'
import { useUserJobType } from './index'
import { useUserJobTypes } from '../useUserJobTypes'
import { GetUserJobTypesResponseData, UserJobType } from '../types'

jest.mock('../service', () => ({
  getUserJobTypes: jest.fn(() => getUserJobTypesResponseMock),
  createUserJobType: jest.fn((_userId: string, userJobType: UserJobType) => userJobType),
  editUserJobType: jest.fn((_userId: string, userJobType: UserJobType) => userJobType),
}))

describe('useUserJobType', () => {
  it('should mutate getUserJobTypes data after createUserJobType action', async () => {
    const data = {
      ...getUserJobTypesResponseMock[0],
      jobTypeId: 'jobTypeId123789',
    }

    const { result: useUserJobTypeResult } = renderHook(() => useUserJobType(), {
      wrapper: getAppWrapper(),
    })
    const { result: useUserJobTypesResult } = renderHook(() => useUserJobTypes({ userId: '1' }), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => useUserJobTypesResult.current.getUserJobTypes.isSuccess)

    await act(
      async () =>
        await useUserJobTypeResult.current.createUserJobType.mutateAsync({ userId: '123', ...data })
    )

    await waitFor(() => useUserJobTypeResult.current.createUserJobType.isSuccess)

    expect(
      queryClient.getQueryData<GetUserJobTypesResponseData>([UsersCacheKeys.UserJobTypes])
    ).toContainEqual<UserJobType>(data)
  })

  it('should mutate getUserJobTypes data after editUserJobType action', async () => {
    const data = {
      ...getUserJobTypesResponseMock[0],
      jobTypeId: 'jobTypeId1234234234',
    }

    const { result: useUserJobTypeResult } = renderHook(() => useUserJobType(), {
      wrapper: getAppWrapper(),
    })
    const { result: useUserJobTypesResult } = renderHook(() => useUserJobTypes({ userId: '1' }), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => useUserJobTypesResult.current.getUserJobTypes.isSuccess)

    await act(
      async () =>
        await useUserJobTypeResult.current.editUserJobType.mutateAsync({
          userId: '1239900',
          ...data,
        })
    )

    await waitFor(() => useUserJobTypeResult.current.editUserJobType.isSuccess)

    expect(
      queryClient.getQueryData<GetUserJobTypesResponseData>([UsersCacheKeys.UserJobTypes])
    ).toContainEqual<UserJobType>(data)
  })
})
