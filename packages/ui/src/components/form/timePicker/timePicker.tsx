import { ComponentProps } from 'react'
import { DateTime } from 'utils'
import { TimePicker as AntdTimePicker, TimePickerProps as AntdTimePickerProps } from 'antd'
import { FieldHookConfig, useField } from 'formik'

import { classes } from '../../../utils'
import { withInputHelpers } from '../withInputHelpers'
import './styles.scss'

export interface BaseTimePickerProps {
  name?: AntdTimePickerProps['name']
  allowClear?: AntdTimePickerProps['allowClear']
  autoFocus?: AntdTimePickerProps['autoFocus']
  bordered?: AntdTimePickerProps['bordered']
  className?: AntdTimePickerProps['className']
  clearIcon?: AntdTimePickerProps['clearIcon']
  defaultValue?: AntdTimePickerProps['defaultValue']
  disabled?: AntdTimePickerProps['disabled']
  disabledTime?: AntdTimePickerProps['disabledTime']
  format?: AntdTimePickerProps['format']
  getPopupContainer?: AntdTimePickerProps['getPopupContainer']
  hideDisabledOptions?: AntdTimePickerProps['hideDisabledOptions']
  hourStep?: AntdTimePickerProps['hourStep']
  inputReadOnly?: AntdTimePickerProps['inputReadOnly']
  minuteStep?: AntdTimePickerProps['minuteStep']
  open?: AntdTimePickerProps['open']
  placeholder?: AntdTimePickerProps['placeholder']
  placement?: AntdTimePickerProps['placement']
  popupClassName?: AntdTimePickerProps['popupClassName']
  popupStyle?: AntdTimePickerProps['popupStyle']
  renderExtraFooter?: AntdTimePickerProps['renderExtraFooter']
  secondStep?: AntdTimePickerProps['secondStep']
  showNow?: AntdTimePickerProps['showNow']
  size?: AntdTimePickerProps['size']
  status?: AntdTimePickerProps['status']
  suffixIcon?: AntdTimePickerProps['suffixIcon']
  use12Hours?: AntdTimePickerProps['use12Hours']
  value?: AntdTimePickerProps['value']
  onChange?: AntdTimePickerProps['onChange']
  onOpenChange?: AntdTimePickerProps['onOpenChange']
  onSelect?: AntdTimePickerProps['onSelect']
  onBlur?: AntdTimePickerProps['onBlur']
}

export const BaseTimePicker = ({ className, ...rest }: BaseTimePickerProps) => {
  return (
    <AntdTimePicker className={classes('timePicker', className)} aria-label={rest.name} {...rest} />
  )
}

export const TimePicker = withInputHelpers<BaseTimePickerProps>(BaseTimePicker)

export type TimePickerProps = ComponentProps<typeof TimePicker>

export const TimePickerField = (
  props: TimePickerProps & Omit<FieldHookConfig<typeof AntdTimePicker>, 'onChange' | 'onBlur'>
) => {
  const { name, validate, onChange, onBlur, help, ...componentProps } = props
  const fieldProps: FieldHookConfig<DateTime | null> = { name, validate }
  const [field, meta, helpers] = useField(fieldProps)

  const handleOnChange = (dates: DateTime | null, dateStrings: string) => {
    helpers.setValue(dates)
    onChange && onChange(dates, dateStrings)
  }

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    field.onBlur(e)
    onBlur && onBlur(e)
  }

  return (
    <TimePicker
      help={meta.touched && meta.error ? meta.error : help || <div />}
      validateStatus={meta.touched && meta.error ? 'error' : undefined}
      {...field}
      {...componentProps}
      onBlur={handleOnBlur}
      onChange={handleOnChange}
    />
  )
}

export type TimePickerFieldProps = ComponentProps<typeof TimePickerField>
