import { queryClient, useMutation } from 'ui'

import * as usersService from '../service'
import { UsersCacheKeys } from '../consts'
import {
  CreateUserCustomPermissionRequestData,
  EditUserCustomPermissionRequestData,
  GetUserCustomPermissionsResponseData,
} from '../types'

export const useUserCustomPermission = () => {
  const createUserCustomPermission = useMutation({
    mutationFn: ({ userId, ...data }: CreateUserCustomPermissionRequestData & { userId: string }) =>
      usersService.createUserCustomPermission(userId, data),
    onSuccess: newCustomUserPermission =>
      queryClient.setQueryData<GetUserCustomPermissionsResponseData>(
        [UsersCacheKeys.UserCustomPermissions],
        cachedData => {
          if (!cachedData) return

          return [...cachedData, newCustomUserPermission]
        }
      ),
  })

  const editUserCustomPermission = useMutation({
    mutationFn: ({ userId, ...data }: EditUserCustomPermissionRequestData & { userId: string }) =>
      usersService.editUserCustomPermission(userId, data),
    onSuccess: updatedUserCustomPermission => {
      queryClient.setQueryData<GetUserCustomPermissionsResponseData>(
        [UsersCacheKeys.UserCustomPermissions],
        cachedData => {
          if (!cachedData) return

          return cachedData.map(userCustomPermission =>
            userCustomPermission.id === updatedUserCustomPermission.id
              ? updatedUserCustomPermission
              : userCustomPermission
          )
        }
      )
    },
  })

  return {
    createUserCustomPermission,
    editUserCustomPermission,
  }
}
