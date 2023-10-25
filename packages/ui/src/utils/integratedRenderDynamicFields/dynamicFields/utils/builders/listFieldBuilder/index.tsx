import { DynamicFieldsLabel } from '../../../components'
import { validationBuilder } from '../validationBuilder'
import { DynamicField, DynamicListFieldProps, Field } from '../../../../types'
import { SelectField, SelectFieldProps } from '../../../../../../components'

export const listFieldBuilder = ({
  code,
  required,
  label,
  placeholder,
  tooltip,
  groupCode,
  helpText,
  properties,
  validation,
}: DynamicField<DynamicListFieldProps>): Field<SelectFieldProps, DynamicListFieldProps> => {
  return {
    Component: SelectField,
    key: code,
    name: code,
    required,
    label: <DynamicFieldsLabel label={label} tooltip={tooltip} />,
    group: groupCode,
    placeholder: placeholder || undefined,
    help: helpText,
    options: properties.options,
    properties,
    validate: validationBuilder(validation?.rules),
  }
}
