import { StringifiableRecord } from 'utils'
import { useQuery } from 'ui'

import * as jobTypesService from '../service'
import { JobTypesCacheKeys } from '../consts'

type JobTypeTemplateParams = { templateId?: string } & StringifiableRecord

export const useJobTypeTemplate = ({
  jobTypeTemplateParams,
  shouldQueryJobTypeTemplate,
}: {
  jobTypeTemplateParams?: JobTypeTemplateParams
  shouldQueryJobTypeTemplate?: boolean
}) => {
  const getJobTypeTemplate = useQuery({
    queryKey: [JobTypesCacheKeys.JobTypeTemplate, jobTypeTemplateParams],
    queryFn: () => {
      if (jobTypeTemplateParams) {
        const { templateId, ...query } = jobTypeTemplateParams

        return jobTypesService.getJobTypeTemplate(templateId, query)
      }

      return jobTypesService.getJobTypeTemplate()
    },
    enabled: !!shouldQueryJobTypeTemplate,
  })

  return {
    getJobTypeTemplate,
  }
}
