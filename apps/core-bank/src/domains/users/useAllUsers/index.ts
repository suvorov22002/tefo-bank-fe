import { useQuery } from 'ui'

import * as usersService from '../service'
import { UsersCacheKeys } from '../consts'

export const useAllUsers = ({ shouldQueryAllUsers = true }: { shouldQueryAllUsers?: boolean }) => {
  const getAllUsers = useQuery({
    queryFn: usersService.getAllUsers,
    queryKey: [UsersCacheKeys.AllUsers],
    enabled: shouldQueryAllUsers,
  })

  return {
    getAllUsers,
  }
}
