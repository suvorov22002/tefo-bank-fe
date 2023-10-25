import { DatePicker as AntdDatePicker } from 'antd'
import { ComponentProps } from 'react'
import { DateTime, dateTimeUtils } from 'utils'
import { FieldHookConfig, useField } from 'formik'

import { classes } from '../../../utils'
import { withInputHelpers } from '../withInputHelpers'
import './styles.scss'

export type BaseDatePickerProps = ComponentProps<typeof AntdDatePicker> & {
  dateStringValueFormat?: string
}

export const BaseDatePicker = ({
  className,
  onChange,
  dateStringValueFormat,
  ...rest
}: BaseDatePickerProps) => {
  const handleOnChange: BaseDatePickerProps['onChange'] = (date, dateString) => {
    if (!date) {
      onChange && onChange(date, dateString)

      return
    }

    onChange &&
      onChange(date, dateStringValueFormat ? date.format(dateStringValueFormat) : dateString)
  }

  return (
    <AntdDatePicker
      aria-label={rest.name}
      className={classes('timePicker', className)}
      onChange={handleOnChange}
      {...rest}
    />
  )
}

export const DatePicker = withInputHelpers<BaseDatePickerProps>(BaseDatePicker)

export type DatePickerProps = ComponentProps<typeof DatePicker>

export const DatePickerField = (
  props: DatePickerProps &
    Omit<FieldHookConfig<typeof AntdDatePicker>, 'onChange' | 'onBlur'> & {
      stringMode?: boolean
    }
) => {
  const { name, validate, onChange, onBlur, help, stringMode = false, ...componentProps } = props
  const fieldProps: FieldHookConfig<DateTime | null | string> = { name, validate }
  const [field, meta, helpers] = useField(fieldProps)

  const handleOnChange = (dates: DateTime | null, dateStrings: string) => {
    helpers.setValue(stringMode ? dateStrings : dates)
    onChange && onChange(dates, dateStrings)
  }

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    field.onBlur(e)
    onBlur && onBlur(e)
  }

  return (
    <DatePicker
      help={meta.touched && meta.error ? meta.error : help || <div />}
      validateStatus={meta.touched && meta.error ? 'error' : undefined}
      {...field}
      value={stringMode ? (field.value ? dateTimeUtils.dateTime(field.value) : null) : field.value}
      {...componentProps}
      onBlur={handleOnBlur}
      onChange={handleOnChange}
    />
  )
}

export type DatePickerFieldProps = ComponentProps<typeof DatePickerField>
