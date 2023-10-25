import { DEFAULT_DATE_FORMAT } from '../../../../consts'
import { DynamicFieldsLabel } from '../../../components'
import { validationBuilder } from '../validationBuilder'
import { DatePickerField, DatePickerFieldProps } from '../../../../../../components'
import { DynamicDateTimeFieldProps, DynamicField, Field } from '../../../../types'

export const dateTimeFieldBuilder = ({
  code,
  required,
  groupCode,
  placeholder,
  helpText,
  label,
  tooltip,
  validation,
  properties,
}: DynamicField<DynamicDateTimeFieldProps>): Field<
  DatePickerFieldProps,
  DynamicDateTimeFieldProps
> => {
  return {
    Component: DatePickerField,
    key: code,
    name: code,
    required,
    group: groupCode,
    help: helpText,
    stringMode: true,
    dateStringValueFormat: DEFAULT_DATE_FORMAT,
    showTime: true,
    label: <DynamicFieldsLabel label={label} tooltip={tooltip} />,
    placeholder: placeholder || undefined,
    properties,
    validate: validationBuilder(validation?.rules),
  }
}
