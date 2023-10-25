import { INTEGRATED_RenderDynamicFields } from 'ui'

export const CustomFieldsCacheKeys = Object.freeze({
  CustomFields: 'customFields',
  CustomFieldValidationRules: 'customFieldValidationRules',
  CustomFieldGroups: 'customFieldGroups',
  AllCustomFieldGroups: 'allCustomFieldGroups',
})

export const customFieldsEntitiesWithLevelOfDetail = [
  INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit,
  INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Contract,
  INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Client,
  INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Transaction,
  INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Account,
]
