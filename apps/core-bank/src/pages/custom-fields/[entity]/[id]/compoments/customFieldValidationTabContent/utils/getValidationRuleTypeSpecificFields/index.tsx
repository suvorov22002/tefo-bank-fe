import { INTEGRATED_RenderDynamicFields } from 'ui'

import {
  LessDateValidationRuleTypeSpecificFields,
  MaxFutureValidationRuleTypeSpecificFields,
  MaxLengthValidationRuleTypeSpecificFields,
  MaxPastValidationRuleTypeSpecificFields,
  MaxValidationRuleTypeSpecificFields,
  MinFutureValidationRuleTypeSpecificFields,
  MinLengthValidationRuleTypeSpecificFields,
  MinPastValidationRuleTypeSpecificFields,
  MinValidationRuleTypeSpecificFields,
  MoreDateValidationRuleTypeSpecificFields,
  PatternValidationRuleTypeSpecificFields,
} from '../../components'

export const getValidationRuleTypeSpecificFields = (
  type: INTEGRATED_RenderDynamicFields.ValidationRuleTypes | null,
  customFieldType: INTEGRATED_RenderDynamicFields.DynamicFieldTypes
) => {
  switch (type) {
    case INTEGRATED_RenderDynamicFields.ValidationRuleTypes.Min:
      return <MinValidationRuleTypeSpecificFields />
    case INTEGRATED_RenderDynamicFields.ValidationRuleTypes.Max:
      return <MaxValidationRuleTypeSpecificFields />
    case INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MinLength:
      return <MinLengthValidationRuleTypeSpecificFields />
    case INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MaxLength:
      return <MaxLengthValidationRuleTypeSpecificFields />
    case INTEGRATED_RenderDynamicFields.ValidationRuleTypes.Regex:
      return <PatternValidationRuleTypeSpecificFields />
    case INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MinFuture:
      return <MinFutureValidationRuleTypeSpecificFields />
    case INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MaxFuture:
      return <MaxFutureValidationRuleTypeSpecificFields />
    case INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MinPast:
      return <MinPastValidationRuleTypeSpecificFields />
    case INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MaxPast:
      return <MaxPastValidationRuleTypeSpecificFields />
    case INTEGRATED_RenderDynamicFields.ValidationRuleTypes.LessDate:
      return (
        <LessDateValidationRuleTypeSpecificFields
          showTime={customFieldType === INTEGRATED_RenderDynamicFields.DynamicFieldTypes.DateTime}
        />
      )
    case INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MoreDate:
      return (
        <MoreDateValidationRuleTypeSpecificFields
          showTime={customFieldType === INTEGRATED_RenderDynamicFields.DynamicFieldTypes.DateTime}
        />
      )

    default:
      return null
  }
}
