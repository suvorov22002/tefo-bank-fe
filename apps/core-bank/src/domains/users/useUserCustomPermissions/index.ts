import { useQuery } from 'ui'

import * as usersService from '../service'
import { UsersCacheKeys } from '../consts'

export const useUserCustomPermissions = ({ userId }: { userId: string }) => {
  const getUserCustomPermissions = useQuery({
    queryKey: [UsersCacheKeys.UserCustomPermissions],
    queryFn: () => usersService.getUserCustomPermissions(userId),
  })

  return {
    getUserCustomPermissions,
  }
}
