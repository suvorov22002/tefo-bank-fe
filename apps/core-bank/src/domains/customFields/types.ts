import { INTEGRATED_RenderDynamicFields } from 'ui'

import { Paginated } from '@/types'

export interface GetCustomFieldsResponseData
  extends Paginated<INTEGRATED_RenderDynamicFields.DynamicField[]> {}

export interface CreateCustomFieldRequestData
  extends Omit<
    INTEGRATED_RenderDynamicFields.DynamicField,
    'id' | 'required' | 'validation' | 'properties' | 'hiddenOnCreate'
  > {}

export interface CreateCustomFieldResponseData
  extends INTEGRATED_RenderDynamicFields.DynamicField {}

export interface EditCustomFieldRequestData extends INTEGRATED_RenderDynamicFields.DynamicField {}

export interface GetCustomFieldGroupsResponseData
  extends Paginated<INTEGRATED_RenderDynamicFields.DynamicFieldGroup[]> {}

export interface CreateCustomFieldGroupRequestData
  extends Omit<INTEGRATED_RenderDynamicFields.DynamicFieldGroup, 'id'> {}

export interface CreateCustomFieldGroupResponseData
  extends INTEGRATED_RenderDynamicFields.DynamicFieldGroup {}

export interface GetCustomFieldGroupResponseData
  extends INTEGRATED_RenderDynamicFields.DynamicFieldGroup {}

export interface EditCustomFieldGroupRequestData
  extends INTEGRATED_RenderDynamicFields.DynamicFieldGroup {}
export interface EditCustomFieldGroupResponseData
  extends INTEGRATED_RenderDynamicFields.DynamicFieldGroup {}

export type GetCustomFieldValidationRulesResponseData = Omit<
  INTEGRATED_RenderDynamicFields.ValidationRule,
  'message'
>[]

export interface CreateCustomFieldValidationRuleRequestData
  extends Omit<INTEGRATED_RenderDynamicFields.ValidationRule, 'id' | 'message'> {}

export interface CreateCustomFieldValidationRuleResponseData
  extends Omit<INTEGRATED_RenderDynamicFields.ValidationRule, 'message'> {}

export interface EditCustomFieldValidationRuleRequestData
  extends Omit<INTEGRATED_RenderDynamicFields.ValidationRule, 'message'> {}

export interface EditCustomFieldValidationRuleResponseData
  extends Omit<INTEGRATED_RenderDynamicFields.ValidationRule, 'message'> {}

export type GetAllCustomFieldGroupsResponseData = INTEGRATED_RenderDynamicFields.DynamicFieldGroup[]
