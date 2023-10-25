import { Checkbox as AntdCheckbox, CheckboxProps as AntdCheckboxProps } from 'antd'
import { Attributes, ComponentProps } from 'react'
import { FieldHookConfig, useField } from 'formik'

import { withInputHelpers } from '../withInputHelpers'

export interface BaseCheckboxProps extends Attributes {
  autoFocus?: AntdCheckboxProps['autoFocus']
  checked?: AntdCheckboxProps['checked']
  defaultChecked?: AntdCheckboxProps['defaultChecked']
  disabled?: AntdCheckboxProps['disabled']
  indeterminate?: AntdCheckboxProps['indeterminate']
  onChange?: AntdCheckboxProps['onChange']
  className?: AntdCheckboxProps['className']
  rootClassName?: AntdCheckboxProps['rootClassName']
  style?: AntdCheckboxProps['style']
  onClick?: AntdCheckboxProps['onClick']
  value?: AntdCheckboxProps['value']
  tabIndex?: AntdCheckboxProps['tabIndex']
  name?: AntdCheckboxProps['name']
  id?: AntdCheckboxProps['id']
}

const BaseCheckbox = (props: BaseCheckboxProps) => (
  <AntdCheckbox aria-label={props.name} {...props} />
)

export const Checkbox = withInputHelpers<BaseCheckboxProps>(BaseCheckbox)

export interface CheckboxProps extends ComponentProps<typeof Checkbox> {}

export const CheckboxField = (
  props: ComponentProps<typeof Checkbox> & Omit<FieldHookConfig<boolean>, 'onChange' | 'onBlur'>
) => {
  const { name, validate, type, innerRef, onChange, help, ...componentProps } = props
  const fieldProps: FieldHookConfig<boolean> = {
    name,
    validate,
    type,
    innerRef,
  }
  const [field, meta, helpers] = useField(fieldProps)

  const handleOnChange: ComponentProps<typeof Checkbox>['onChange'] = e => {
    helpers.setValue(e.target.checked)
    onChange && onChange(e)
  }

  return (
    <Checkbox
      validateStatus={meta.touched && meta.error ? 'error' : undefined}
      help={meta.touched && meta.error ? meta.error : help || <div />}
      {...field}
      checked={field.value}
      {...componentProps}
      onChange={handleOnChange}
    />
  )
}

export type CheckboxFieldProps = ComponentProps<typeof CheckboxField>
