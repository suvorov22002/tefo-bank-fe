import { ButtonProps as AntButtonProps, Button as AntdButton } from 'antd'

export interface ButtonProps {
  block?: AntButtonProps['block']
  danger?: AntButtonProps['danger']
  disabled?: AntButtonProps['disabled']
  ghost?: AntButtonProps['ghost']
  htmlType?: AntButtonProps['htmlType']
  icon?: AntButtonProps['icon']
  loading?: AntButtonProps['loading']
  shape?: AntButtonProps['shape']
  size?: AntButtonProps['size']
  type?: AntButtonProps['type']
  style?: AntButtonProps['style']
  className?: AntButtonProps['className']
  children?: AntButtonProps['children']
  form?: AntButtonProps['form']
  onClick?: AntButtonProps['onClick']
}

export const Button = (props: ButtonProps) => <AntdButton {...props} />

Button.Group = AntdButton.Group
