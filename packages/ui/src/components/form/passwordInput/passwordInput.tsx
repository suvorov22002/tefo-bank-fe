import { Input as AntdInput } from 'antd'
import { ChangeEvent, ComponentProps, FocusEvent, InputHTMLAttributes } from 'react'
import { FieldHookConfig, useField } from 'formik'

import { withInputHelpers } from '../withInputHelpers'

const AntdPasswordInput = AntdInput.Password

type AntdPasswordInputProps = ComponentProps<typeof AntdPasswordInput>

export interface BasePasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'type' | 'required'> {
  addonAfter?: AntdPasswordInputProps['addonAfter']
  addonBefore?: AntdPasswordInputProps['addonBefore']
  allowClear?: AntdPasswordInputProps['allowClear']
  bordered?: AntdPasswordInputProps['bordered']
  disabled?: AntdPasswordInputProps['disabled']
  id?: AntdPasswordInputProps['id']
  maxLength?: AntdPasswordInputProps['maxLength']
  showCount?: AntdPasswordInputProps['showCount']
  status?: AntdPasswordInputProps['status']
  prefix?: AntdPasswordInputProps['prefix']
  size?: AntdPasswordInputProps['size']
  suffix?: AntdPasswordInputProps['suffix']
  value?: AntdPasswordInputProps['value']
  defaultValue?: AntdPasswordInputProps['defaultValue']
  visibilityToggle?: AntdPasswordInputProps['visibilityToggle']
  iconRender?: AntdPasswordInputProps['iconRender']
  onChange?: AntdPasswordInputProps['onChange']
  onBlur?: AntdPasswordInputProps['onBlur']
}

export const BasePasswordInput = (props: BasePasswordInputProps) => {
  return <AntdPasswordInput aria-label={props.name} {...props} />
}

export const PasswordInput = withInputHelpers<BasePasswordInputProps>(BasePasswordInput)

export interface PasswordInputProps extends ComponentProps<typeof PasswordInput> {}

export const PasswordInputField = <Values,>(
  props: PasswordInputProps & FieldHookConfig<Values>
) => {
  const { name, validate, type, innerRef, onChange, onBlur, help, ...componentProps } = props
  const fieldProps: FieldHookConfig<Values> = { name, validate, type, innerRef }
  const [field, meta] = useField(fieldProps)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    field.onChange(e)
    onChange && onChange(e)
  }

  const handleOnBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
    field.onBlur(e)
    onBlur && onBlur(e)
  }

  return (
    <PasswordInput
      validateStatus={meta.touched && meta.error ? 'error' : undefined}
      help={meta.touched && meta.error ? meta.error : help || <div />}
      {...field}
      {...componentProps}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
    />
  )
}

export type PasswordInputFieldProps = ComponentProps<typeof PasswordInputField>
