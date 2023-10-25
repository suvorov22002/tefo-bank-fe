import { setValueByPath } from '../utils'
import {
  DynamicField,
  DynamicFieldTypes,
  DynamicFieldsTemplate,
  DynamicPhoneNumberFieldProps,
  ValidationRuleTypes,
} from '../../types'

import { getDynamicFieldsInitialValue } from '../getDynamicFieldsInitialValue'

export function getDynamicFieldsInitialValuesInCreateMode<V>(template: DynamicFieldsTemplate) {
  const visiblePrimaryFields = template.primaryFields.filter(
    primaryField => !primaryField.hiddenOnCreate
  )

  const requiredCustomFields = template.customFields.filter(customField =>
    customField.validation.rules.find(
      validationRule => validationRule.type === ValidationRuleTypes.Required
    )
  )

  const initialVisibleCustomFields = requiredCustomFields.reduce(
    (visibleCustomFields: DynamicField[], currCustomField) => {
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

  return [...visiblePrimaryFields, ...initialVisibleCustomFields].reduce<Record<string, unknown>>(
    (initialValues, field) => {
      const fieldCode = field.code

      //TODO: Update phoneNumber defaultValue handling after phoneNumberField refactoring
      if (field.type === DynamicFieldTypes.PhoneNumber) {
        const { phoneCodeName, phoneValueName } = field.properties as DynamicPhoneNumberFieldProps

        if (phoneCodeName && phoneValueName) {
          initialValues[phoneCodeName] = ''
          initialValues[phoneValueName] = ''
        }

        return initialValues
      }

      setValueByPath(initialValues, fieldCode, getDynamicFieldsInitialValue(field))

      return initialValues
    },
    {}
  ) as V
}
