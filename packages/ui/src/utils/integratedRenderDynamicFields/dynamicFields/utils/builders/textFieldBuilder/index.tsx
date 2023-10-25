import { DynamicFieldsLabel } from '../../../components'
import { validationBuilder } from '../validationBuilder'
import { DynamicField, DynamicTextFieldProps, Field } from '../../../../types'
import { InputField, InputFieldProps } from '../../../../../../components'

export const textFieldBuilder = ({
  code,
  required,
  label,
  placeholder,
  tooltip,
  helpText,
  groupCode,
  validation,
  properties,
}: DynamicField<DynamicTextFieldProps>): Field<InputFieldProps, DynamicTextFieldProps> => {
  return {
    Component: InputField,
    key: code,
    group: groupCode,
    name: code,
    required,
    label: <DynamicFieldsLabel label={label} tooltip={tooltip} />,
    placeholder: placeholder || undefined,
    help: helpText,
    properties,
    validate: validationBuilder(validation?.rules),
  }
}
