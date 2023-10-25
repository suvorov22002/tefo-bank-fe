import { ComponentStory, Meta } from '@storybook/react'

import { Button } from '../button'
import { EmptyDefaultSvg } from '../icon'
import { Empty, EmptyProps } from './empty'
import { StoriesThemeWrapper, disableArgTypesTableControl } from '../../__storybook__'

export default {
  title: 'Empty',
  component: Empty,
  argTypes: {
    description: {
      description: 'Customize description',
      ...disableArgTypesTableControl,
    },
    image: {
      description: 'Customize image. Will treat as image url when string provided',
      ...disableArgTypesTableControl,
      table: {
        defaultValue: { summary: 'Empty.PRESENTED_IMAGE_DEFAULT' },
      },
    },
    imageStyle: {
      description: 'The style of image',
      ...disableArgTypesTableControl,
    },
  },
} as Meta<EmptyProps>

const Template: ComponentStory<typeof Empty> = (args: EmptyProps) => (
  <StoriesThemeWrapper>
    <Empty {...args} />
  </StoriesThemeWrapper>
)

export const Default = Template.bind({})
export const Custom = Template.bind({})

Default.args = {}
Custom.args = {
  image: <EmptyDefaultSvg />,
  imageStyle: { height: 60 },
  description: 'Custom description',
  children: <Button type="primary">Click</Button>,
}
