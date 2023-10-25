import { StringifiableRecord } from 'utils'
import { useQuery } from 'ui'

import * as usersService from '../service'
import { UsersCacheKeys } from '../consts'

type UserDetailsTemplateParams = { templateId?: string } & StringifiableRecord

export const useUserDetailsTemplate = ({
  userDetailsTemplateParams,
  shouldQueryUserDetailsTemplate,
}: {
  userDetailsTemplateParams?: UserDetailsTemplateParams
  shouldQueryUserDetailsTemplate?: boolean
}) => {
  const getUserDetailsTemplate = useQuery({
    queryKey: [UsersCacheKeys.UserDetailsTemplate, userDetailsTemplateParams],
    queryFn: () => {
      if (userDetailsTemplateParams) {
        const { templateId, ...query } = userDetailsTemplateParams

        return usersService.getUserDetailsTemplate(templateId, query)
      }

      return usersService.getUserDetailsTemplate()
    },
    enabled: !!shouldQueryUserDetailsTemplate,
  })

  return {
    getUserDetailsTemplate,
  }
}
