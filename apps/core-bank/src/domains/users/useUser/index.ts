import { queryClient, useMutation, useQuery } from 'ui'

import * as usersService from '../service'
import { CreateUserRequestData } from '../types'
import { UsersCacheKeys } from '../consts'

export const useUser = ({ userId }: { userId?: string }) => {
  const getUser = useQuery({
    queryKey: [UsersCacheKeys.Users, userId],
    queryFn: () => usersService.getUser(userId as string),
    enabled: !!userId,
  })

  const createUser = useMutation({
    mutationFn: (data: CreateUserRequestData) => usersService.createUser(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [UsersCacheKeys.Users],
      }),
  })

  const editUserDetails = useMutation({
    mutationFn: usersService.editUserDetails,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [UsersCacheKeys.Users],
      }),
  })

  const resetUserPassword = useMutation({
    mutationFn: usersService.resetUserPassword,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [UsersCacheKeys.Users],
      }),
  })

  const approveUser = useMutation({
    mutationFn: usersService.approveUser,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [UsersCacheKeys.Users],
      }),
  })

  const inactivateUser = useMutation({
    mutationFn: usersService.inactivateUser,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [UsersCacheKeys.Users],
      }),
  })

  return {
    getUser,
    createUser,
    editUserDetails,
    resetUserPassword,
    approveUser,
    inactivateUser,
  }
}
