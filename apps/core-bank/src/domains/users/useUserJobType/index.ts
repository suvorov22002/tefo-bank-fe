import { queryClient, useMutation } from 'ui'

import * as usersService from '../service'
import { UsersCacheKeys } from '../consts'
import { CreateUserJobTypeRequestData, GetUserJobTypesResponseData, UserJobType } from '../types'

export const useUserJobType = () => {
  const createUserJobType = useMutation({
    mutationFn: ({ userId, ...data }: CreateUserJobTypeRequestData & { userId: string }) =>
      usersService.createUserJobType(userId, data),
    onSuccess: newJobType =>
      queryClient.setQueryData<GetUserJobTypesResponseData>(
        [UsersCacheKeys.UserJobTypes],
        cachedData => {
          if (!cachedData) return

          return [...cachedData, newJobType]
        }
      ),
  })

  const editUserJobType = useMutation({
    mutationFn: ({ userId, ...data }: UserJobType & { userId: string }) =>
      usersService.editUserJobType(userId, data),
    onSuccess: updatedJobType => {
      queryClient.setQueryData<GetUserJobTypesResponseData>(
        [UsersCacheKeys.UserJobTypes],
        cachedData => {
          if (!cachedData) return

          return cachedData.map(jobType =>
            jobType.id === updatedJobType.id ? updatedJobType : jobType
          )
        }
      )
    },
  })

  return {
    editUserJobType,
    createUserJobType,
  }
}
