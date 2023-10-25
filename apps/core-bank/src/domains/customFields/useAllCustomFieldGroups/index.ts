import * as customFieldsService from '../service'
import { CustomFieldsCacheKeys } from '../consts'
import { INTEGRATED_RenderDynamicFields, useQuery } from 'ui'

export const useAllCustomFieldGroups = (
  entity: INTEGRATED_RenderDynamicFields.DynamicFieldEntities | null
) => {
  const getAllCustomFieldGroups = useQuery({
    queryKey: [CustomFieldsCacheKeys.AllCustomFieldGroups, entity],
    queryFn: () =>
      customFieldsService.getAllCustomFieldGroups(
        entity as INTEGRATED_RenderDynamicFields.DynamicFieldEntities
      ),
    enabled: !!entity,
  })

  return {
    getAllCustomFieldGroups,
  }
}
