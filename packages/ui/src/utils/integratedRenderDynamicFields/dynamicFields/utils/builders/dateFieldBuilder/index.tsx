import { DEFAULT_DATE_FORMAT } from '../../../../consts'
import { DynamicFieldsLabel } from '../../../components'
import { validationBuilder } from '../validationBuilder'
import { DatePickerField, DatePickerFieldProps } from '../../../../../../components'
import { DynamicDateFieldProps, DynamicField, Field } from '../../../../types'

export const dateFieldBuilder = ({
  code,
  required,
  groupCode,
  placeholder,
  helpText,
  label,
  tooltip,
  validation,
  properties,
}: DynamicField<DynamicDateFieldProps>): Field<DatePickerFieldProps, DynamicDateFieldProps> => {
  return {
    Component: DatePickerField,
    stringMode: true,
    dateStringValueFormat: DEFAULT_DATE_FORMAT,
    key: code,
    name: code,
    required,
    group: groupCode,
    help: helpText,
    label: <DynamicFieldsLabel label={label} tooltip={tooltip} />,
    placeholder: placeholder || undefined,
    properties,
    validate: validationBuilder(validation?.rules),
  }
}
