import { DynamicFieldsLabel } from '../../../components'
import { validationBuilder } from '../validationBuilder'
import { DynamicField, DynamicIntegerPercentFieldProps, Field } from '../../../../types'
import { InputNumberPercentField, InputNumberPercentFieldProps } from '../../../../../../components'

export const integerPercentFieldBuilder = ({
  code,
  required,
  label,
  groupCode,
  placeholder,
  tooltip,
  helpText,
  validation,
  properties,
}: DynamicField<DynamicIntegerPercentFieldProps>): Field<
  InputNumberPercentFieldProps,
  DynamicIntegerPercentFieldProps
> => {
  return {
    Component: InputNumberPercentField,
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
