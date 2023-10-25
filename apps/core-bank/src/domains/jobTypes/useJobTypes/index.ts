import { useQuery } from 'ui'

import * as jobTypesService from '../service'
import { JobTypesCacheKeys } from '../consts'

export const useJobTypes = ({ page, limit }: { page: number; limit: number }) => {
  const getJobTypes = useQuery({
    queryKey: [JobTypesCacheKeys.JobTypes, page, limit],
    queryFn: () => jobTypesService.getJobTypes(page, limit),
  })

  return {
    getJobTypes,
  }
}
