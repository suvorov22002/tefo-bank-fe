import { queryClient } from 'ui'
import { act, renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { UsersCacheKeys } from '../consts'
import { getUserCustomPermissionsMock } from '../api/mocks'
import { useUserCustomPermission } from './index'
import { useUserCustomPermissions } from '../useUserCustomPermissions'
import { GetUserCustomPermissionsResponseData, UserCustomPermission } from '../types'

jest.mock('../service', () => ({
  getUserCustomPermissions: jest.fn(() => getUserCustomPermissionsMock),
  createUserCustomPermission: jest.fn(
    (_userId: string, userCustomPermission: UserCustomPermission) => userCustomPermission
  ),
  editUserCustomPermission: jest.fn(
    (_userId: string, userCustomPermission: UserCustomPermission) => userCustomPermission
  ),
}))

describe('useUserCustomPermission', () => {
  it('should mutate getUserCustomPermissions data after createUserCustomPermission action', async () => {
    const data = {
      ...getUserCustomPermissionsMock[0],
      permissionId: 'permissionId123445',
    }

    const { result: useUserCustomPermissionResult } = renderHook(() => useUserCustomPermission(), {
      wrapper: getAppWrapper(),
    })
    const { result: useUserCustomPermissionsResult } = renderHook(
      () => useUserCustomPermissions({ userId: '1' }),
      {
        wrapper: getAppWrapper(),
      }
    )

    await waitFor(() => useUserCustomPermissionsResult.current.getUserCustomPermissions.isSuccess)

    await act(
      async () =>
        await useUserCustomPermissionResult.current.createUserCustomPermission.mutateAsync({
          userId: '1',
          ...data,
        })
    )

    await waitFor(() => useUserCustomPermissionResult.current.createUserCustomPermission.isSuccess)

    expect(
      queryClient.getQueryData<GetUserCustomPermissionsResponseData>([
        UsersCacheKeys.UserCustomPermissions,
      ])
    ).toContainEqual<UserCustomPermission>(data)
  })

  it('should mutate getUserCustomPermissions data after editUserCustomPermission action', async () => {
    const data = {
      ...getUserCustomPermissionsMock[0],
      unitId: 'unitId1231',
    }

    const { result: useUserCustomPermissionResult } = renderHook(() => useUserCustomPermission(), {
      wrapper: getAppWrapper(),
    })
    const { result: useUserCustomPermissionsResult } = renderHook(
      () => useUserCustomPermissions({ userId: '1' }),
      {
        wrapper: getAppWrapper(),
      }
    )

    await waitFor(() => useUserCustomPermissionsResult.current.getUserCustomPermissions.isSuccess)

    await act(
      async () =>
        await useUserCustomPermissionResult.current.editUserCustomPermission.mutateAsync({
          userId: '1',
          ...data,
        })
    )

    await waitFor(() => useUserCustomPermissionResult.current.editUserCustomPermission.isSuccess)

    expect(
      queryClient.getQueryData<GetUserCustomPermissionsResponseData>([
        UsersCacheKeys.UserCustomPermissions,
      ])
    ).toContainEqual<UserCustomPermission>(data)
  })
})
