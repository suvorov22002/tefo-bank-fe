import { DynamicFieldsLabel } from '../../../components'
import { validationBuilder } from '../validationBuilder'
import { DynamicDecimalFieldProps, DynamicField, Field } from '../../../../types'
import { InputNumberField, InputNumberFieldProps } from '../../../../../../components'

export const decimalFieldBuilder = ({
  code,
  required,
  label,
  groupCode,
  placeholder,
  tooltip,
  helpText,
  properties,
  validation,
}: DynamicField<DynamicDecimalFieldProps>): Field<
  InputNumberFieldProps,
  DynamicDecimalFieldProps
> => {
  return {
    Component: InputNumberField,
    key: code,
    name: code,
    required,
    label: <DynamicFieldsLabel label={label} tooltip={tooltip} />,
    group: groupCode,
    placeholder: placeholder || undefined,
    help: helpText,
    properties,
    validate: validationBuilder(validation?.rules),
    precision: properties.decimals || undefined,
  }
}
