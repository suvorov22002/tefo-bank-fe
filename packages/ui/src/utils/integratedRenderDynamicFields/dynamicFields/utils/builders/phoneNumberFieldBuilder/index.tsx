import { DynamicFieldsLabel } from '../../../components'
import { validationBuilder } from '../validationBuilder'
import { DynamicField, DynamicPhoneNumberFieldProps, Field } from '../../../../types'
import { PhoneNumberInputField, PhoneNumberInputFieldProps } from '../../../../../../components'

export const phoneNumberFieldBuilder = ({
  code,
  label,
  helpText,
  required,
  tooltip,
  groupCode,
  validation,
  properties,
}: DynamicField<DynamicPhoneNumberFieldProps>): Field<
  PhoneNumberInputFieldProps,
  DynamicPhoneNumberFieldProps
> => {
  return {
    Component: PhoneNumberInputField,
    key: properties.phoneValueName,
    label: <DynamicFieldsLabel label={label} tooltip={tooltip} />,
    required,
    group: groupCode,
    help: helpText,
    properties,
    name: code,
    codeInputProps: {
      name: properties.phoneCodeName,
      // Only required rule is needed, code input will be replaced with a select
      validate: validationBuilder(validation.rules.filter(rule => rule.type === 'REQUIRED')),
    },
    numberInputProps: {
      name: properties.phoneValueName,
      validate: validationBuilder(validation.rules),
    },
  }
}
