import { INTEGRATED_RenderDynamicFields, useQuery } from 'ui'

import * as customFieldsService from '../service'
import { CustomFieldsCacheKeys } from '../consts'

export const useCustomFieldValidationRules = (
  entity: INTEGRATED_RenderDynamicFields.DynamicFieldEntities,
  customFieldId: INTEGRATED_RenderDynamicFields.DynamicField['id']
) => {
  const getCustomFieldValidationRules = useQuery({
    queryKey: [CustomFieldsCacheKeys.CustomFieldValidationRules, entity, customFieldId],
    queryFn: () => customFieldsService.getCustomFieldValidationRules(entity, customFieldId),
  })

  return {
    getCustomFieldValidationRules,
  }
}
