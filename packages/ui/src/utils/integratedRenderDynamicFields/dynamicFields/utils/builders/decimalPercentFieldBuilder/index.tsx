import { DynamicFieldsLabel } from '../../../components'
import { validationBuilder } from '../validationBuilder'
import { DynamicDecimalPercentFieldProps, DynamicField, Field } from '../../../../types'
import { InputNumberPercentField, InputNumberPercentFieldProps } from '../../../../../../components'

export const decimalPercentFieldBuilder = ({
  code,
  required,
  label,
  groupCode,
  placeholder,
  tooltip,
  helpText,
  properties,
  validation,
}: DynamicField<DynamicDecimalPercentFieldProps>): Field<
  InputNumberPercentFieldProps,
  DynamicDecimalPercentFieldProps
> => {
  return {
    Component: InputNumberPercentField,
    key: code,
    name: code,
    required,
    group: groupCode,
    placeholder: placeholder || undefined,
    label: <DynamicFieldsLabel label={label} tooltip={tooltip} />,
    help: helpText,
    precision: properties.decimals || undefined,
    properties,
    validate: validationBuilder(validation?.rules),
  }
}
