import { useQuery } from 'ui'

import * as usersService from '../service'
import { UsersCacheKeys } from '../consts'

export const usePermissionsBasicInfo = ({
  shouldQueryPermissionsBasicInfo = true,
}: {
  shouldQueryPermissionsBasicInfo?: boolean
}) => {
  const getPermissionsBasicInfo = useQuery({
    queryKey: [UsersCacheKeys.PermissionsBasicInfo],
    queryFn: usersService.getPermissionsBasicInfo,
    enabled: shouldQueryPermissionsBasicInfo,
  })

  const permissionsOptions =
    getPermissionsBasicInfo.data?.map(el => ({ value: el.id, label: el.name })) || []

  return {
    getPermissionsBasicInfo,
    permissionsOptions,
  }
}
