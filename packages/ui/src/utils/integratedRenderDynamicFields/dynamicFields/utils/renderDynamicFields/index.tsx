import { RenderDynamicField } from '../../../types'
import {
  DynamicBooleanFieldProps,
  DynamicDateFieldProps,
  DynamicDateTimeFieldProps,
  DynamicDecimalFieldProps,
  DynamicDecimalPercentFieldProps,
  DynamicDictionaryFieldProps,
  DynamicField,
  DynamicFieldApiClient,
  DynamicFieldTypes,
  DynamicIntegerFieldProps,
  DynamicIntegerPercentFieldProps,
  DynamicListFieldProps,
  DynamicPhoneNumberFieldProps,
  DynamicReferenceFieldProps,
  DynamicTextFieldProps,
} from '../../../types'
import {
  booleanFieldBuilder,
  dateFieldBuilder,
  dateTimeFieldBuilder,
  decimalFieldBuilder,
  decimalPercentFieldBuilder,
  dictionaryFieldBuilder,
  integerFieldBuilder,
  integerPercentFieldBuilder,
  listFieldBuilder,
  phoneNumberFieldBuilder,
  referenceFieldBuilder,
  textFieldBuilder,
} from '../builders'

export const getRenderDynamicFields =
  (apiClient: DynamicFieldApiClient) =>
  (fields: DynamicField[], customRenderDynamicField?: RenderDynamicField) => {
    const normalizedFields = [...fields]
      .sort((a, b) => a.order - b.order)
      .map(field => {
        switch (field.type) {
          case DynamicFieldTypes.Boolean:
          case DynamicFieldTypes.Checkbox:
            return booleanFieldBuilder(field as DynamicField<DynamicBooleanFieldProps>)
          case DynamicFieldTypes.Date:
            return dateFieldBuilder(field as DynamicField<DynamicDateFieldProps>)
          case DynamicFieldTypes.DateTime:
            return dateTimeFieldBuilder(field as DynamicField<DynamicDateTimeFieldProps>)
          case DynamicFieldTypes.Decimal:
            return decimalFieldBuilder(field as DynamicField<DynamicDecimalFieldProps>)
          case DynamicFieldTypes.DecimalPercent:
            return decimalPercentFieldBuilder(
              field as DynamicField<DynamicDecimalPercentFieldProps>
            )
          case DynamicFieldTypes.Dictionary:
            return dictionaryFieldBuilder(
              field as DynamicField<DynamicDictionaryFieldProps>,
              apiClient
            )
          case DynamicFieldTypes.EmbeddedEntities:
          case DynamicFieldTypes.EmbeddedEntity:
          case DynamicFieldTypes.EmbeddedStructure:
          case DynamicFieldTypes.EmbeddedStructures:
          case DynamicFieldTypes.RemoteEntities:
          case DynamicFieldTypes.RemoteEntity:
            return referenceFieldBuilder(
              field as DynamicField<DynamicReferenceFieldProps>,
              apiClient
            )
          case DynamicFieldTypes.Integer:
            return integerFieldBuilder(field as DynamicField<DynamicIntegerFieldProps>)
          case DynamicFieldTypes.IntegerPercent:
            return integerPercentFieldBuilder(
              field as DynamicField<DynamicIntegerPercentFieldProps>
            )
          case DynamicFieldTypes.List:
            return listFieldBuilder(field as DynamicField<DynamicListFieldProps>)
          case DynamicFieldTypes.PhoneNumber:
            return phoneNumberFieldBuilder(field as DynamicField<DynamicPhoneNumberFieldProps>)
          case DynamicFieldTypes.Text:
            return textFieldBuilder(field as DynamicField<DynamicTextFieldProps>)
        }
      })

    const renderDynamicField = (field: (typeof normalizedFields)[number], i: number) => {
      if (!field) return null
      const { Component, ...props } = field

      return customRenderDynamicField ? (
        customRenderDynamicField(field, i)
      ) : (
        <Component {...props} />
      )
    }

    return normalizedFields.map(renderDynamicField)
  }
