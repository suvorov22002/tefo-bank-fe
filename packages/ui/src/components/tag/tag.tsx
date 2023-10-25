import { Tag as AntdTag, TagProps as AntdTagProps } from 'antd'

export interface TagProps {
  color?: AntdTagProps['color']
  bordered?: AntdTagProps['bordered']
  icon?: AntdTagProps['icon']
  children?: AntdTagProps['children']
  closable?: AntdTagProps['closable']
}

export const Tag = (props: TagProps) => {
  return <AntdTag {...props} />
}
