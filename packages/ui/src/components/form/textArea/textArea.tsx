import { Input as AntdInput } from 'antd'
import { ChangeEvent, ComponentProps, FocusEvent, TextareaHTMLAttributes } from 'react'
import { FieldHookConfig, useField } from 'formik'

import { withInputHelpers } from '../withInputHelpers'

const AntdTextArea = AntdInput.TextArea

interface AntdTextAreaProps extends ComponentProps<typeof AntdTextArea> {}

export interface BaseTextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'required' | 'onResize'> {
  allowClear?: AntdTextAreaProps['allowClear']
  autoSize?: AntdTextAreaProps['autoSize']
  bordered?: AntdTextAreaProps['bordered']
  defaultValue?: AntdTextAreaProps['defaultValue']
  maxLength?: AntdTextAreaProps['maxLength']
  showCount?: AntdTextAreaProps['showCount']
  value?: AntdTextAreaProps['value']
  size?: AntdTextAreaProps['size']
  required?: AntdTextAreaProps['required']
  onPressEnter?: AntdTextAreaProps['onPressEnter']
  onResize?: AntdTextAreaProps['onResize']
}

export const BaseTextArea = (props: BaseTextAreaProps) => {
  return <AntdTextArea aria-label={props.name} {...props} />
}

export const TextArea = withInputHelpers<BaseTextAreaProps>(BaseTextArea)

export interface TextAreaProps extends ComponentProps<typeof TextArea> {}

export const TextAreaField = <Values,>(props: TextAreaProps & FieldHookConfig<Values>) => {
  const { name, validate, type, innerRef, onChange, onBlur, help, ...componentProps } = props
  const fieldProps: FieldHookConfig<Values> = { name, validate, type, innerRef }
  const [field, meta] = useField(fieldProps)

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    field.onChange(e)
    onChange && onChange(e)
  }

  const handleOnBlur = (e: FocusEvent<HTMLTextAreaElement, Element>) => {
    field.onBlur(e)
    onBlur && onBlur(e)
  }

  return (
    <TextArea
      validateStatus={meta.touched && meta.error ? 'error' : undefined}
      help={meta.touched && meta.error ? meta.error : help || <div />}
      {...field}
      {...componentProps}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
    />
  )
}

export type TextAreaFieldProps = ComponentProps<typeof TextAreaField>
