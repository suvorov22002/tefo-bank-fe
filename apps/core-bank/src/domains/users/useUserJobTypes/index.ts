import { useQuery } from 'ui'

import * as usersService from '../service'
import { UsersCacheKeys } from '../consts'

export const useUserJobTypes = ({ userId }: { userId: string }) => {
  const getUserJobTypes = useQuery({
    queryKey: [UsersCacheKeys.UserJobTypes],
    queryFn: () => usersService.getUserJobTypes(userId),
  })

  return {
    getUserJobTypes,
  }
}
