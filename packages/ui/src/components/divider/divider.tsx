import { Divider as AntdDivider, DividerProps as AntdDividerProps } from 'antd'

export interface DividerProps {
  children?: AntdDividerProps['children']
  className?: AntdDividerProps['className']
  dashed?: AntdDividerProps['dashed']
  orientation?: AntdDividerProps['orientation']
  orientationMargin?: AntdDividerProps['orientationMargin']
  plain?: AntdDividerProps['plain']
  style?: AntdDividerProps['style']
  type?: AntdDividerProps['type']
}

export const Divider = (props: DividerProps) => {
  return <AntdDivider {...props} />
}
