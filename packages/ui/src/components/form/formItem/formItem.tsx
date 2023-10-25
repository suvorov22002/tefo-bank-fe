import { Form as AntdForm, FormItemProps as AntdFormItemProps } from 'antd'

export interface FormItemProps {
  colon?: AntdFormItemProps['colon']
  extra?: AntdFormItemProps['extra']
  hasFeedback?: AntdFormItemProps['hasFeedback']
  validateStatus?: AntdFormItemProps['validateStatus']
  help?: AntdFormItemProps['help']
  htmlFor?: AntdFormItemProps['htmlFor']
  noStyle?: AntdFormItemProps['noStyle']
  required?: AntdFormItemProps['required']
  tooltip?: AntdFormItemProps['tooltip']
  wrapperCol?: AntdFormItemProps['wrapperCol']
  label?: AntdFormItemProps['label']
  labelCol?: AntdFormItemProps['labelCol']
  labelAlign?: AntdFormItemProps['labelAlign']
}

export const FormItem = (props: FormItemProps) => {
  return <AntdForm.Item {...props} />
}
