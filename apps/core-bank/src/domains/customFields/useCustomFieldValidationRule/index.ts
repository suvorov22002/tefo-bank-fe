import { INTEGRATED_RenderDynamicFields, queryClient, useMutation } from 'ui'

import * as customFieldsService from '../service'
import { CustomFieldsCacheKeys } from '../consts'
import {
  CreateCustomFieldValidationRuleRequestData,
  EditCustomFieldValidationRuleRequestData,
  GetCustomFieldValidationRulesResponseData,
} from '../types'

export const useCustomFieldValidationRule = (
  entity: INTEGRATED_RenderDynamicFields.DynamicFieldEntities,
  customFieldId: INTEGRATED_RenderDynamicFields.DynamicField['id']
) => {
  const createCustomFieldValidationRule = useMutation({
    mutationFn: (data: CreateCustomFieldValidationRuleRequestData) =>
      customFieldsService.createCustomFieldValidationRule(entity, customFieldId, data),
    onSuccess: data => {
      queryClient.setQueryData<GetCustomFieldValidationRulesResponseData>(
        [CustomFieldsCacheKeys.CustomFieldValidationRules, entity, customFieldId],
        cachedData => {
          return [...(cachedData || []), data]
        }
      )
    },
  })

  const editCustomFieldValidationRule = useMutation({
    mutationFn: (data: EditCustomFieldValidationRuleRequestData) =>
      customFieldsService.editCustomFieldValidationRule(entity, customFieldId, data),
    onSuccess: data => {
      queryClient.setQueryData<GetCustomFieldValidationRulesResponseData>(
        [CustomFieldsCacheKeys.CustomFieldValidationRules, entity, customFieldId],
        cachedData => {
          return cachedData?.map(cachedValidationRule => {
            if (cachedValidationRule.id === data.id) {
              return {
                ...cachedValidationRule,
                ...data,
              }
            }

            return cachedValidationRule
          })
        }
      )
    },
  })

  const deleteCustomFieldValidationRule = useMutation({
    mutationFn: (validationRuleId: INTEGRATED_RenderDynamicFields.ValidationRule['id']) =>
      customFieldsService.deleteCustomFieldValidationRule(entity, customFieldId, validationRuleId),
    onSuccess: (_, validationRuleId) => {
      queryClient.setQueryData<GetCustomFieldValidationRulesResponseData>(
        [CustomFieldsCacheKeys.CustomFieldValidationRules, entity, customFieldId],
        cachedData =>
          cachedData?.filter(cachedValidationRule => cachedValidationRule.id !== validationRuleId)
      )
    },
  })

  return {
    createCustomFieldValidationRule,
    editCustomFieldValidationRule,
    deleteCustomFieldValidationRule,
  }
}
