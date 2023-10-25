import { getDynamicFieldsInitialValue } from '../getDynamicFieldsInitialValue'
import { setValueByPath } from '../utils'
import {
  DynamicField,
  DynamicFieldTypes,
  DynamicFieldsTemplate,
  DynamicPhoneNumberFieldProps,
  ValidationRuleTypes,
} from '../../types'

export function getDynamicFieldsInitialValuesInEditMode<V>(
  template: DynamicFieldsTemplate,
  values: Record<string, unknown>
) {
  const customFieldsWithValue = template.customFields.filter(
    customField => values[customField.code]
  )

  const requiredCustomFields = template.customFields.filter(customField =>
    customField.validation.rules.find(
      validationRule => validationRule.type === ValidationRuleTypes.Required
    )
  )

  const initialVisibleCustomFields = [...customFieldsWithValue, ...requiredCustomFields].reduce(
    (visibleCustomFields: DynamicField[], currCustomField) => {
      if (
        visibleCustomFields.find(
          visibleCustomField => visibleCustomField.code === currCustomField.code
        )
      )
        return visibleCustomFields

      if (currCustomField.groupCode && !currCustomField.independent) {
        const fieldsInGroup = template.customFields.filter(
          customField => customField.groupCode === currCustomField.groupCode
        )

        visibleCustomFields.push(...fieldsInGroup)

        return visibleCustomFields
      }

      visibleCustomFields.push(currCustomField)

      return visibleCustomFields
    },
    []
  )

  return [...template.primaryFields, ...initialVisibleCustomFields].reduce<Record<string, unknown>>(
    (initialValues, field) => {
      const fieldCode = field.code

      //TODO: Update phoneNumber defaultValue handling after phoneNumberField refactoring
      if (field.type === DynamicFieldTypes.PhoneNumber) {
        const { phoneCodeName, phoneValueName } = field.properties as DynamicPhoneNumberFieldProps

        if (phoneCodeName && phoneValueName) {
          initialValues[phoneCodeName] = Object.prototype.hasOwnProperty.call(values, phoneCodeName)
            ? values[phoneCodeName]
            : ''
          initialValues[phoneValueName] = Object.prototype.hasOwnProperty.call(
            values,
            phoneValueName
          )
            ? values[phoneValueName]
            : ''
        }

        return initialValues
      }

      setValueByPath(initialValues, fieldCode, getDynamicFieldsInitialValue(field, values))

      return initialValues
    },
    {}
  ) as V
}
