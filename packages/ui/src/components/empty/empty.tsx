import { Empty as AntdEmpty, EmptyProps as AntdEmptyProps } from 'antd'

export interface EmptyProps {
  description?: AntdEmptyProps['description']
  image?: AntdEmptyProps['image']
  imageStyle?: AntdEmptyProps['imageStyle']
  className?: AntdEmptyProps['className']
  children?: AntdEmptyProps['children']
}

export const Empty = (props: EmptyProps) => <AntdEmpty {...props} />

export const EmptyPresentedImageSimple = AntdEmpty.PRESENTED_IMAGE_SIMPLE
