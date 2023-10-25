import { INTEGRATED_RenderDynamicFields, useQuery } from 'ui'

import * as customFieldsService from '../service'
import { CustomFieldsCacheKeys } from '../consts'

export const useCustomFields = (
  entity: INTEGRATED_RenderDynamicFields.DynamicFieldEntities | null,
  {
    page,
    limit,
  }: {
    page: number
    limit: number
  }
) => {
  const getCustomFields = useQuery({
    queryFn: () =>
      customFieldsService.getCustomFields(
        entity as INTEGRATED_RenderDynamicFields.DynamicFieldEntities,
        page,
        limit
      ),
    queryKey: [CustomFieldsCacheKeys.CustomFields, entity, page, limit],
    enabled: !!entity,
  })

  return {
    getCustomFields,
  }
}
