import { FormikProps, INTEGRATED_RenderDynamicFields } from 'ui'

import {
  BooleanDataTypeSpecificFields,
  DateDataTypeSpecificFields,
  DecimalDataTypeSpecificFields,
  DecimalPercentDataTypeSpecificFields,
  DictionaryDataTypeSpecificFields,
  IntegerDataTypeSpecificField,
  IntegerPercentDataTypeSpecificFields,
  ListDataTypeSpecificFields,
  RemoteEntitySpecificFields,
  TextDataTypeSpecificFields,
} from '../../components'
import { CreateCustomFieldFormValues, CustomFieldDetailsFormValues } from '../../types'

export const getDataTypeSpecificFields = (
  dataType: INTEGRATED_RenderDynamicFields.DynamicFieldTypes,
  formProps: FormikProps<CreateCustomFieldFormValues> | FormikProps<CustomFieldDetailsFormValues>,
  isInEditMode = false,
  customField: INTEGRATED_RenderDynamicFields.DynamicField | undefined = undefined
) => {
  switch (dataType) {
    case INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Boolean:
      return (
        <BooleanDataTypeSpecificFields
          formProps={formProps}
          customField={
            customField as INTEGRATED_RenderDynamicFields.DynamicField<INTEGRATED_RenderDynamicFields.DynamicBooleanFieldProps>
          }
          isInEditMode={isInEditMode}
        />
      )
    case INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Date:
      return (
        <DateDataTypeSpecificFields
          formProps={formProps}
          customField={
            customField as INTEGRATED_RenderDynamicFields.DynamicField<INTEGRATED_RenderDynamicFields.DynamicDateFieldProps>
          }
          isInEditMode={isInEditMode}
        />
      )
    case INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Decimal:
      return (
        <DecimalDataTypeSpecificFields
          formProps={formProps}
          customField={
            customField as INTEGRATED_RenderDynamicFields.DynamicField<INTEGRATED_RenderDynamicFields.DynamicDecimalFieldProps>
          }
          isInEditMode={isInEditMode}
        />
      )
    case INTEGRATED_RenderDynamicFields.DynamicFieldTypes.DecimalPercent:
      return (
        <DecimalPercentDataTypeSpecificFields
          formProps={formProps}
          customField={
            customField as INTEGRATED_RenderDynamicFields.DynamicField<INTEGRATED_RenderDynamicFields.DynamicDecimalPercentFieldProps>
          }
          isInEditMode={isInEditMode}
        />
      )
    case INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Integer:
      return (
        <IntegerDataTypeSpecificField
          formProps={formProps}
          customField={
            customField as INTEGRATED_RenderDynamicFields.DynamicField<INTEGRATED_RenderDynamicFields.DynamicDecimalFieldProps>
          }
          isInEditMode={isInEditMode}
        />
      )
    case INTEGRATED_RenderDynamicFields.DynamicFieldTypes.IntegerPercent:
      return (
        <IntegerPercentDataTypeSpecificFields
          formProps={formProps}
          customField={
            customField as INTEGRATED_RenderDynamicFields.DynamicField<INTEGRATED_RenderDynamicFields.DynamicIntegerPercentFieldProps>
          }
          isInEditMode={isInEditMode}
        />
      )
    case INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Text:
      return (
        <TextDataTypeSpecificFields
          formProps={formProps}
          customField={
            customField as INTEGRATED_RenderDynamicFields.DynamicField<INTEGRATED_RenderDynamicFields.DynamicTextFieldProps>
          }
          isInEditMode={isInEditMode}
        />
      )
    case INTEGRATED_RenderDynamicFields.DynamicFieldTypes.List:
      return (
        <ListDataTypeSpecificFields
          customField={
            customField as INTEGRATED_RenderDynamicFields.DynamicField<INTEGRATED_RenderDynamicFields.DynamicListFieldProps>
          }
          formProps={formProps}
          isInEditMode={isInEditMode}
        />
      )
    case INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Dictionary:
      return (
        <DictionaryDataTypeSpecificFields
          formProps={formProps}
          customField={
            customField as INTEGRATED_RenderDynamicFields.DynamicField<INTEGRATED_RenderDynamicFields.DynamicDictionaryFieldProps>
          }
          isInEditMode={isInEditMode}
        />
      )
    case INTEGRATED_RenderDynamicFields.DynamicFieldTypes.RemoteEntity: {
      return (
        <RemoteEntitySpecificFields
          formProps={formProps}
          customField={
            customField as INTEGRATED_RenderDynamicFields.DynamicField<INTEGRATED_RenderDynamicFields.DynamicReferenceFieldProps>
          }
          isInEditMode={isInEditMode}
        />
      )
    }

    default:
      return null
  }
}
