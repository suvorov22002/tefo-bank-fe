import { Result as AntdResult, ResultProps as AntdResultProps } from 'antd'

export interface ResultProps {
  title?: AntdResultProps['title']
  subTitle?: AntdResultProps['subTitle']
  status?: AntdResultProps['status']
  icon?: AntdResultProps['icon']
  extra?: AntdResultProps['extra']
  className?: AntdResultProps['className']
  children?: AntdResultProps['children']
}

export const Result = (props: ResultProps) => <AntdResult {...props} />
