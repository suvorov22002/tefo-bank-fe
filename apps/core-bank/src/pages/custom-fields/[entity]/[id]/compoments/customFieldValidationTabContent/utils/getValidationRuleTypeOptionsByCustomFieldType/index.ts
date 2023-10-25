import { INTEGRATED_RenderDynamicFields } from 'ui'

import { TFunction } from '@/i18n'

import {
  getValidationRuleTypeOptions,
  validationRuleTypesEligibleForCustomFieldDataTypesMap,
} from '../../consts'

export const getValidationRuleTypeOptionsByCustomFieldType = (
  customFieldType: INTEGRATED_RenderDynamicFields.DynamicFieldTypes,
  t: TFunction
) =>
  getValidationRuleTypeOptions(t).filter(validationRuleTypeOption =>
    validationRuleTypesEligibleForCustomFieldDataTypesMap[validationRuleTypeOption.value].includes(
      customFieldType
    )
  )
