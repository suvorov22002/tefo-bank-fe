import { INTEGRATED_RenderDynamicFields, queryClient, useMutation, useQuery } from 'ui'

import * as customFieldsService from '../service'
import { CustomFieldsCacheKeys } from '../consts'
import { CreateCustomFieldGroupRequestData, EditCustomFieldGroupRequestData } from '../types'

export const useCustomFieldGroup = (
  entity: INTEGRATED_RenderDynamicFields.DynamicFieldEntities,
  id?: INTEGRATED_RenderDynamicFields.DynamicFieldGroup['id']
) => {
  const createCustomFieldGroup = useMutation({
    mutationFn: (data: CreateCustomFieldGroupRequestData) =>
      customFieldsService.createCustomFieldGroup(entity, data),

    onSuccess: () => {
      queryClient.invalidateQueries([CustomFieldsCacheKeys.CustomFieldGroups, entity])
    },
  })

  const getCustomFieldGroup = useQuery({
    queryKey: [CustomFieldsCacheKeys.CustomFieldGroups, entity, id],
    queryFn: () =>
      customFieldsService.getCustomFieldGroup(
        entity,
        id as INTEGRATED_RenderDynamicFields.DynamicFieldGroup['id']
      ),
    enabled: !!id,
  })

  const editCustomFieldGroup = useMutation({
    mutationFn: (data: EditCustomFieldGroupRequestData) =>
      customFieldsService.editCustomFieldGroup(entity, data),
    onSuccess: data => {
      queryClient.setQueryData<INTEGRATED_RenderDynamicFields.DynamicFieldGroup>(
        [CustomFieldsCacheKeys.CustomFieldGroups, entity, data.id],
        cachedData => ({
          ...cachedData,
          ...data,
        })
      )

      queryClient.invalidateQueries([CustomFieldsCacheKeys.CustomFieldGroups, entity])
    },
  })

  return {
    createCustomFieldGroup,
    getCustomFieldGroup,
    editCustomFieldGroup,
  }
}
