import { useQuery } from 'ui'

import * as jobTypesService from '../service'
import { JobTypesCacheKeys } from '../consts'

export const useJobTypesBasicInfo = ({
  shouldQueryJobTypesBasicInfo = true,
}: {
  shouldQueryJobTypesBasicInfo?: boolean
}) => {
  const getJobTypesBasicInfo = useQuery({
    queryKey: [JobTypesCacheKeys.JobTypesBasicInfo],
    queryFn: () => jobTypesService.getJobTypesBasicInfo(),
    enabled: shouldQueryJobTypesBasicInfo,
  })

  const jobTypeOptions =
    getJobTypesBasicInfo.data?.map(el => ({ value: el.id, label: el.name })) || []

  return {
    getJobTypesBasicInfo,
    jobTypeOptions,
  }
}
