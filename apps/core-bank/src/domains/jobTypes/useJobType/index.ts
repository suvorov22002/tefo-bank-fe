import { queryClient, useMutation, useQuery } from 'ui'

import * as jobTypesService from '../service'
import { JobTypesCacheKeys } from '../consts'
import { CreateJobTypeRequestData, JobType } from '../types'

export const useJobType = ({ jobTypeId }: { jobTypeId?: string }) => {
  const createJobType = useMutation({
    mutationFn: (data: CreateJobTypeRequestData) => jobTypesService.createJobType(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [JobTypesCacheKeys.JobTypes],
      }),
  })

  const getJobType = useQuery({
    queryKey: [JobTypesCacheKeys.JobType, jobTypeId],
    queryFn: () => jobTypesService.getJobType(jobTypeId as string),
    enabled: !!jobTypeId,
  })

  const editJobType = useMutation({
    mutationFn: (data: JobType) => jobTypesService.editJobType(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [JobTypesCacheKeys.JobType],
      }),
  })

  return {
    createJobType,
    getJobType,
    editJobType,
  }
}
