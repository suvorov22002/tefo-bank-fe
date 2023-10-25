import { InputNumber as AntdInputNumber, InputNumberProps as AntdInputNumberProps } from 'antd'
import { ComponentProps, InputHTMLAttributes } from 'react'
import { FieldHookConfig, useField } from 'formik'

import { withInputHelpers } from '../withInputHelpers'
import { classes, percentageValueFormatter, percentageValueParser } from '../../../utils'
import './styles.scss'

export interface BaseInputNumberPercentProps
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
  onChange?: AntdInputNumberProps['onChange']
  onPressEnter?: AntdInputNumberProps['onPressEnter']
  onStep?: AntdInputNumberProps['onStep']
}

export const BaseInputNumberPercent = ({
  className,
  stringMode,
  ...rest
}: BaseInputNumberPercentProps) => {
  return (
    <AntdInputNumber
      aria-label={rest.name}
      controls
      formatter={value => percentageValueFormatter(value)}
      parser={value =>
        percentageValueParser(value, {
          stringMode,
        })
      }
      className={classes('inputNumberPercent', className)}
      {...rest}
    />
  )
}

export const InputNumberPercent =
  withInputHelpers<BaseInputNumberPercentProps>(BaseInputNumberPercent)

export interface InputNumberPercentProps extends ComponentProps<typeof InputNumberPercent> {}

export const InputNumberPercentField = (
  props: InputNumberPercentProps & FieldHookConfig<number | string | null>
) => {
  const { name, validate, type, innerRef, onChange, onBlur, help, ...componentProps } = props
  const fieldProps: FieldHookConfig<number | string | null> = {
    name,
    validate,
    type,
    innerRef,
  }
  const [field, meta, helpers] = useField<number | string | null>(fieldProps)

  const handleOnChange: BaseInputNumberPercentProps['onChange'] = value => {
    helpers.setValue(value)
    onChange && onChange(value)
  }

  const handleOnBlur: BaseInputNumberPercentProps['onBlur'] = e => {
    field.onBlur(e)
    onBlur && onBlur(e)
  }

  return (
    <InputNumberPercent
      validateStatus={meta.touched && meta.error ? 'error' : undefined}
      help={meta.touched && meta.error ? meta.error : help || <div />}
      {...field}
      {...componentProps}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
    />
  )
}

export type InputNumberPercentFieldProps = ComponentProps<typeof InputNumberPercentField>
