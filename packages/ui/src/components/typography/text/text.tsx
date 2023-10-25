import { TextProps as AntdTextProps } from 'antd/es/typography/Text'
import { Typography as AntdTypography } from 'antd'
import { HTMLAttributes } from 'react'

export interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  code?: AntdTextProps['code']
  copyable?: AntdTextProps['copyable']
  delete?: AntdTextProps['delete']
  disabled?: AntdTextProps['disabled']
  editable?: AntdTextProps['editable']
  ellipsis?: AntdTextProps['ellipsis']
  keyboard?: AntdTextProps['keyboard']
  mark?: AntdTextProps['mark']
  onClick?: AntdTextProps['onClick']
  strong?: AntdTextProps['strong']
  italic?: AntdTextProps['italic']
  type?: AntdTextProps['type']
  underline?: AntdTextProps['underline']
}

export const Text = (props: TextProps) => {
  return <AntdTypography.Text {...props} />
}
