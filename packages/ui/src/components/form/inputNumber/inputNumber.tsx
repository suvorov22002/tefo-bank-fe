import { InputNumber as AntdInputNumber, InputNumberProps as AntdInputNumberProps } from 'antd'
import { ComponentProps, InputHTMLAttributes } from 'react'
import { FieldHookConfig, useField } from 'formik'

import { classes } from '../../../utils'
import { withInputHelpers } from '../withInputHelpers'
import './styles.scss'

export interface BaseInputNumberProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'size' | 'prefix' | 'required' | 'value' | 'onChange' | 'onInput'
  > {
  type?: AntdInputNumberProps['type']
  addonAfter?: AntdInputNumberProps['addonAfter']
  addonBefore?: AntdInputNumberProps['addonBefore']
  autoFocus?: AntdInputNumberProps['autoFocus']
  bordered?: AntdInputNumberProps['bordered']
  controls?: AntdInputNumberProps['controls']
  decimalSeparator?: AntdInputNumberProps['decimalSeparator']
  defaultValue?: AntdInputNumberProps['defaultValue']
  disabled?: AntdInputNumberProps['disabled']
  keyboard?: AntdInputNumberProps['keyboard']
  max?: AntdInputNumberProps['max']
  min?: AntdInputNumberProps['min']
  precision?: AntdInputNumberProps['precision']
  readOnly?: AntdInputNumberProps['readOnly']
  status?: AntdInputNumberProps['status']
  prefix?: AntdInputNumberProps['prefix']
  size?: AntdInputNumberProps['size']
  step?: AntdInputNumberProps['step']
  stringMode?: AntdInputNumberProps['stringMode']
  value?: AntdInputNumberProps['value']
  formatter?: AntdInputNumberProps['formatter']
  parser?: AntdInputNumberProps['parser']
  onChange?: AntdInputNumberProps['onChange']
  onPressEnter?: AntdInputNumberProps['onPressEnter']
  onStep?: AntdInputNumberProps['onStep']
}

export const BaseInputNumber = ({ className, ...rest }: BaseInputNumberProps) => {
  return (
    <AntdInputNumber
      aria-label={rest.name}
      controls
      className={classes('inputNumber', className)}
      {...rest}
    />
  )
}

export const InputNumber = withInputHelpers<BaseInputNumberProps>(BaseInputNumber)

export interface InputNumberProps extends ComponentProps<typeof InputNumber> {}

export const InputNumberField = (
  props: InputNumberProps & FieldHookConfig<number | string | null>
) => {
  const { name, validate, type, innerRef, onChange, onBlur, help, ...componentProps } = props
  const fieldProps: FieldHookConfig<number | string | null> = {
    name,
    validate,
    type,
    innerRef,
  }
  const [field, meta, helpers] = useField<number | string | null>(fieldProps)

  const handleOnChange: BaseInputNumberProps['onChange'] = value => {
    helpers.setValue(value)
    onChange && onChange(value)
  }

  const handleOnBlur: BaseInputNumberProps['onBlur'] = e => {
    field.onBlur(e)
    onBlur && onBlur(e)
  }

  return (
    <InputNumber
      validateStatus={meta.touched && meta.error ? 'error' : undefined}
      help={meta.touched && meta.error ? meta.error : help || <div />}
      {...field}
      {...componentProps}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
    />
  )
}

export type InputNumberFieldProps = ComponentProps<typeof InputNumberField>
