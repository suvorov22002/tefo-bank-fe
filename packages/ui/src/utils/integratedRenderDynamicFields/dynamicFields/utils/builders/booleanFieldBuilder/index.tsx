import { DynamicFieldsLabel } from '../../../components'
import { validationBuilder } from '../validationBuilder'
import { CheckboxField, CheckboxFieldProps } from '../../../../../../components'
import { DynamicBooleanFieldProps, DynamicField, Field } from '../../../../types'

export const booleanFieldBuilder = ({
  code,
  required,
  label,
  tooltip,
  helpText,
  groupCode,
  validation,
  properties,
}: DynamicField<DynamicBooleanFieldProps>): Field<CheckboxFieldProps, DynamicBooleanFieldProps> => {
  return {
    Component: CheckboxField,
    key: code,
    name: code,
    required,
    group: groupCode,
    help: helpText,
    label: <DynamicFieldsLabel label={label} tooltip={tooltip} />,
    properties,
    validate: validationBuilder(validation?.rules),
  }
}
