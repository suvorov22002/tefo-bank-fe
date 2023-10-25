import { Input as AntdInput, InputProps as AntdInputProps, InputRef as AntdInputRef } from 'antd'
import {
  ChangeEvent,
  ComponentProps,
  FocusEvent,
  InputHTMLAttributes,
  Ref,
  forwardRef,
} from 'react'
import { FieldHookConfig, useField } from 'formik'

import { withInputHelpers } from '../withInputHelpers'

export interface BaseInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'type' | 'required'> {
  addonAfter?: AntdInputProps['addonAfter']
  addonBefore?: AntdInputProps['addonBefore']
  allowClear?: AntdInputProps['allowClear']
  bordered?: AntdInputProps['bordered']
  disabled?: AntdInputProps['disabled']
  id?: AntdInputProps['id']
  maxLength?: AntdInputProps['maxLength']
  showCount?: AntdInputProps['showCount']
  status?: AntdInputProps['status']
  prefix?: AntdInputProps['prefix']
  size?: AntdInputProps['size']
  suffix?: AntdInputProps['suffix']
  placeholder?: AntdInputProps['placeholder']
  type?: AntdInputProps['type']
  value?: AntdInputProps['value']
  ref?: Ref<AntdInputRef>
  defaultValue?: AntdInputProps['defaultValue']
  onChange?: AntdInputProps['onChange']
  onBlur?: AntdInputProps['onBlur']
}

export const BaseInput = forwardRef<AntdInputRef, BaseInputProps>((props: BaseInputProps, ref) => {
  return <AntdInput aria-label={props.name} ref={ref} {...props} />
})

export type InputRef = AntdInputRef

export const Input = withInputHelpers<BaseInputProps>(BaseInput)

export interface InputProps extends ComponentProps<typeof Input> {}

export const InputField = <Values,>(props: InputProps & FieldHookConfig<Values>) => {
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
    <Input
      validateStatus={meta.touched && meta.error ? 'error' : undefined}
      help={meta.touched && meta.error ? meta.error : help || <div />}
      {...field}
      {...componentProps}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
    />
  )
}

export type InputFieldProps = ComponentProps<typeof InputField>
