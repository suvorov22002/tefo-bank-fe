import { useQuery } from 'ui'

import * as usersService from '../service'
import { UsersCacheKeys } from '../consts'

export const useUsers = ({ page, limit }: { page: number; limit: number }) => {
  const getUsers = useQuery({
    queryKey: [UsersCacheKeys.Users, page, limit],
    queryFn: () => usersService.getUsers(page, limit),
  })

  return {
    getUsers,
  }
}
