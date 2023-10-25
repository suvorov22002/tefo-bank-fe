import { INTEGRATED_RenderDynamicFields, queryClient, useMutation, useQuery } from 'ui'

import * as customFieldsService from '../service'
import { CustomFieldsCacheKeys } from '../consts'
import { CreateCustomFieldRequestData, EditCustomFieldRequestData } from '../types'

export const useCustomField = (
  entity?: INTEGRATED_RenderDynamicFields.DynamicFieldEntities,
  id?: INTEGRATED_RenderDynamicFields.DynamicField['id']
) => {
  const createCustomField = useMutation({
    mutationFn: (data: CreateCustomFieldRequestData) => {
      return customFieldsService.createCustomField(data)
    },

    onSuccess: newCustomField =>
      queryClient.invalidateQueries<INTEGRATED_RenderDynamicFields.DynamicField[]>([
        CustomFieldsCacheKeys.CustomFields,
        newCustomField.entityName,
      ]),
  })

  const editCustomField = useMutation({
    mutationFn: (data: EditCustomFieldRequestData) =>
      customFieldsService.editCustomField(
        entity as INTEGRATED_RenderDynamicFields.DynamicFieldEntities,
        data
      ),
    onSuccess: (data: INTEGRATED_RenderDynamicFields.DynamicField) => {
      queryClient.setQueryData<INTEGRATED_RenderDynamicFields.DynamicField>(
        [CustomFieldsCacheKeys.CustomFields, entity, data.id],
        cachedData => ({
          ...cachedData,
          ...data,
        })
      )

      queryClient.invalidateQueries([CustomFieldsCacheKeys.CustomFields, entity])
    },
  })

  const getCustomField = useQuery({
    queryKey: [CustomFieldsCacheKeys.CustomFields, entity, id],
    queryFn: () =>
      customFieldsService.getCustomField(
        entity as INTEGRATED_RenderDynamicFields.DynamicFieldEntities,
        id as INTEGRATED_RenderDynamicFields.DynamicField['id']
      ),
    enabled: !!entity && !!id,
  })

  return {
    createCustomField,
    getCustomField,
    editCustomField,
  }
}
