import { DynamicFieldsLabel } from '../../../components'
import { validationBuilder } from '../validationBuilder'
import { DynamicField, DynamicIntegerFieldProps, Field } from '../../../../types'
import { InputNumberField, InputNumberFieldProps } from '../../../../../../components'

export const integerFieldBuilder = ({
  code,
  required,
  label,
  groupCode,
  placeholder,
  tooltip,
  helpText,
  validation,
  properties,
}: DynamicField<DynamicIntegerFieldProps>): Field<
  InputNumberFieldProps,
  DynamicIntegerFieldProps
> => {
  return {
    Component: InputNumberField,
    key: code,
    name: code,
    required,
    label: <DynamicFieldsLabel label={label} tooltip={tooltip} />,
    group: groupCode,
    placeholder: placeholder || undefined,
    precision: 0,
    help: helpText,
    properties,
    validate: validationBuilder(validation?.rules),
  }
}
