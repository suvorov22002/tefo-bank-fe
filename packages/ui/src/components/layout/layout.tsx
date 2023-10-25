import { Layout as AntdLayout, LayoutProps as AntdLayoutProps } from 'antd'

import './styles.scss'

export interface LayoutProps {
  className?: AntdLayoutProps['className']
  style?: AntdLayoutProps['style']
  children?: AntdLayoutProps['children']
}

export const Layout = (props: LayoutProps) => {
  return <AntdLayout {...props} />
}
