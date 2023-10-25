import { Typography as AntdTypography } from 'antd'

import { TitleProps as AntdTitleProps } from 'antd/es/typography/Title'
import { HTMLAttributes } from 'react'

export interface TitleProps extends HTMLAttributes<HTMLHeadElement> {
  code?: AntdTitleProps['code']
  copyable?: AntdTitleProps['copyable']
  delete?: AntdTitleProps['delete']
  disabled?: AntdTitleProps['disabled']
  editable?: AntdTitleProps['editable']
  ellipsis?: AntdTitleProps['ellipsis']
  level?: AntdTitleProps['level']
  mark?: AntdTitleProps['mark']
  onClick?: AntdTitleProps['onClick']
  italic?: AntdTitleProps['italic']
  type?: AntdTitleProps['type']
  underline?: AntdTitleProps['underline']
}

export const Title = (props: TitleProps) => {
  return <AntdTypography.Title {...props} />
}
