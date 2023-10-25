import { ComponentStory, Meta } from '@storybook/react'

import { EmptyDefaultSvg } from './customIcons'
import { Icon, IconProps } from './icon'
import { StoriesThemeWrapper, disableArgTypesTableControl } from '../../__storybook__'

export default {
  title: 'Icon',
  component: Icon,
  argTypes: {
    component: {
      description: 'The component used for the root node',
      ...disableArgTypesTableControl,
    },
    rotate: {
      description: 'Rotate degrees',
    },
    spin: {
      description: 'Rotate icon with animation',
      table: {
        defaultValue: { summary: false },
      },
    },
    style: {
      description: 'The style properties of icon, like fontSize and color',
      ...disableArgTypesTableControl,
    },
    className: {
      description: 'The className of Icon',
    },
  },
} as Meta<IconProps>

const Template: ComponentStory<typeof Icon> = (args: IconProps) => (
  <StoriesThemeWrapper>
    <Icon {...args} />
  </StoriesThemeWrapper>
)

export const Default = Template.bind({})

Default.args = { component: EmptyDefaultSvg, style: { fontSize: 99 } }
