import { Layout as AntdLayout, LayoutProps as AntdLayoutProps } from 'antd'

export interface FooterProps {
  className?: AntdLayoutProps['className']
  style?: AntdLayoutProps['style']
  children?: AntdLayoutProps['children']
}

export const Footer = (props: FooterProps) => {
  return <AntdLayout.Footer {...props} />
}
