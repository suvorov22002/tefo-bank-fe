import { useQuery } from 'ui'

import * as jobTypesService from '../service'
import { JobTypesCacheKeys } from '../consts'

export const useAllJobTypesPermissions = ({
  shouldQueryAllPermissionsTreeOptions = true,
}: {
  shouldQueryAllPermissionsTreeOptions?: boolean
}) => {
  const getAllPermissionsTreeOptions = useQuery({
    queryKey: [JobTypesCacheKeys.AllJobTypePermissionsTreeOptions],
    queryFn: () => jobTypesService.getAllPermissionsTreeOptions(),
    enabled: shouldQueryAllPermissionsTreeOptions,
  })

  return {
    getAllPermissionsTreeOptions,
  }
}
