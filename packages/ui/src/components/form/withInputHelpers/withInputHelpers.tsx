import { Attributes, ComponentType } from 'react'

import { FormItem, FormItemProps } from '../formItem'

export const withInputHelpers =
  <ComponentProps,>(Component: ComponentType<ComponentProps>) =>
  (props: ComponentProps & FormItemProps) => {
    const {
      colon,
      extra,
      hasFeedback,
      validateStatus,
      help,
      htmlFor,
      noStyle,
      required,
      tooltip,
      wrapperCol,
      label,
      labelAlign,
      labelCol,
      ...rest
    } = props

    const inputComponentProps = rest as ComponentProps & Attributes
    const formItemProps: FormItemProps = {
      colon,
      extra,
      hasFeedback,
      validateStatus,
      help,
      htmlFor,
      noStyle,
      required,
      tooltip,
      wrapperCol,
      label,
      labelAlign,
      labelCol,
    }

    return (
      <FormItem {...formItemProps}>
        <Component {...inputComponentProps} />
      </FormItem>
    )
  }
