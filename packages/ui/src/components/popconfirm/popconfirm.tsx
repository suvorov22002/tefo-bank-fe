import { Popconfirm as AntdPopconfirm, PopconfirmProps as AntdPopconfirmProps } from 'antd'

export interface PopconfirmProps {
  title: AntdPopconfirmProps['title']
  cancelButtonProps?: AntdPopconfirmProps['cancelButtonProps']
  cancelText?: AntdPopconfirmProps['cancelText']
  disabled?: AntdPopconfirmProps['disabled']
  icon?: AntdPopconfirmProps['icon']
  okButtonProps?: AntdPopconfirmProps['okButtonProps']
  okText?: AntdPopconfirmProps['okText']
  okType?: AntdPopconfirmProps['okType']
  showCancel?: AntdPopconfirmProps['showCancel']
  description?: AntdPopconfirmProps['description']
  className?: AntdPopconfirmProps['className']
  style?: AntdPopconfirmProps['style']
  children?: AntdPopconfirmProps['children']
  onCancel?: AntdPopconfirmProps['onCancel']
  onConfirm?: AntdPopconfirmProps['onConfirm']
  placement?: AntdPopconfirmProps['placement']
}

export const Popconfirm = (props: PopconfirmProps) => {
  return <AntdPopconfirm {...props} />
}
