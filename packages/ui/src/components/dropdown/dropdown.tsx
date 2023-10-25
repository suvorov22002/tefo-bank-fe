import { Dropdown as AntdDropdown, DropdownProps as AntdDropdownProps } from 'antd'

export interface DropdownProps {
  arrow?: AntdDropdownProps['arrow']
  autoAdjustOverflow?: AntdDropdownProps['autoAdjustOverflow']
  autoFocus?: AntdDropdownProps['autoFocus']
  disabled?: AntdDropdownProps['disabled']
  destroyPopupOnHide?: AntdDropdownProps['destroyPopupOnHide']
  menu?: AntdDropdownProps['menu']
  overlayClassName?: AntdDropdownProps['overlayClassName']
  overlayStyle?: AntdDropdownProps['overlayStyle']
  placement?: AntdDropdownProps['placement']
  trigger?: AntdDropdownProps['trigger']
  open?: AntdDropdownProps['open']
  className?: AntdDropdownProps['className']
  children?: AntdDropdownProps['children']
  dropdownRender?: AntdDropdownProps['dropdownRender']
  getPopupContainer?: AntdDropdownProps['getPopupContainer']
  onOpenChange?: AntdDropdownProps['onOpenChange']
}

export const Dropdown = (props: DropdownProps) => <AntdDropdown trigger={['click']} {...props} />

Dropdown.Button = AntdDropdown.Button
