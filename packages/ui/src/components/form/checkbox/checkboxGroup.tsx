import { Checkbox as AntdCheckbox } from 'antd'
import { ComponentProps } from 'react'
import { FieldHookConfig, useField } from 'formik'

import { withInputHelpers } from '../withInputHelpers'

type CheckboxValue = string | number | boolean
type AntdCheckboxGroupProps = ComponentProps<typeof AntdCheckbox.Group>

export interface BaseCheckboxGroupProps {
  defaultValue?: AntdCheckboxGroupProps['defaultValue']
  disabled?: AntdCheckboxGroupProps['disabled']
  name?: AntdCheckboxGroupProps['name']
  options?: AntdCheckboxGroupProps['options']
  value?: AntdCheckboxGroupProps['value']
  onChange?: AntdCheckboxGroupProps['onChange']
}

export const CheckboxGroup = withInputHelpers<BaseCheckboxGroupProps>(AntdCheckbox.Group)

export type CheckboxGroupProps = ComponentProps<typeof CheckboxGroup>

export const CheckboxGroupField = (
  props: CheckboxGroupProps & FieldHookConfig<CheckboxValue[]>
) => {
  const { name, validate, type, innerRef, help, ...componentProps } = props
  const fieldProps: FieldHookConfig<CheckboxValue[]> = {
    name,
    validate,
    type,
    innerRef,
  }
  const [field, meta, helpers] = useField(fieldProps)

  return (
    <CheckboxGroup
      validateStatus={meta.touched && meta.error ? 'error' : undefined}
      help={meta.touched && meta.error ? meta.error : help || <div />}
      {...field}
      onChange={checkedValue => helpers.setValue(checkedValue)}
      {...componentProps}
    />
  )
}
