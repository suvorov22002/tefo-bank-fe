import { Layout as AntdLayout, LayoutProps as AntdLayoutProps } from 'antd'

import { classes } from '../../../utils'
import './styles.scss'

export interface ContentProps {
  className?: AntdLayoutProps['className']
  style?: AntdLayoutProps['style']
  children?: AntdLayoutProps['children']
}

export const Content = ({ className, ...rest }: ContentProps) => {
  return <AntdLayout.Content className={classes('content', className)} {...rest} />
}
