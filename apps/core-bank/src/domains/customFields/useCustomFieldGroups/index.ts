import { INTEGRATED_RenderDynamicFields, useQuery } from 'ui'

import * as customFieldsService from '../service'
import { CustomFieldsCacheKeys } from '../consts'

export const useCustomFieldGroups = (
  entity: INTEGRATED_RenderDynamicFields.DynamicFieldEntities | null,
  {
    page,
    limit,
  }: {
    page: number
    limit: number
  }
) => {
  const getCustomFieldGroups = useQuery({
    queryFn: () =>
      customFieldsService.getCustomFieldGroups(
        entity as INTEGRATED_RenderDynamicFields.DynamicFieldEntities,
        page,
        limit
      ),
    queryKey: [CustomFieldsCacheKeys.CustomFieldGroups, entity, page, limit],
    enabled: !!entity,
  })

  return {
    getCustomFieldGroups,
  }
}
