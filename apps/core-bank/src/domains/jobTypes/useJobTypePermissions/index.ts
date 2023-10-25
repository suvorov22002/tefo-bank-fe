import { useQuery } from 'ui'

import * as jobTypesService from '../service'
import { JobTypesCacheKeys } from '../consts'

export const useJobTypePermissions = ({ page, limit }: { page: number; limit: number }) => {
  const getPermissionsTreeOptions = useQuery({
    queryKey: [JobTypesCacheKeys.JobTypePermissionsTreeOptions, page, limit],
    queryFn: () => jobTypesService.getPermissionsTreeOptions(page, limit),
  })

  return {
    getPermissionsTreeOptions,
  }
}
