import { ComponentStory, Meta } from '@storybook/react'

import { disableArgTypesTableControl } from '../../__storybook__'
import { Tag, TagProps } from './tag'

export default {
  title: 'Tag',
  component: Tag,
  argTypes: {
    color: {
      description: 'Color of the tag',
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    bordered: {
      description: 'Whether the tag has a border',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    icon: {
      description: 'Custom icon for the tag',
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    children: {
      description: 'Content of the tag',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    closable: {
      description: 'Whether the tag can be closed',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
} as Meta<TagProps>

const Template: ComponentStory<typeof Tag> = (args: TagProps) => <Tag {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Default Tag',
}

export const Colored = Template.bind({})
Colored.args = {
  children: 'Colored Tag',
  color: 'blue',
}

export const Bordered = Template.bind({})
Bordered.args = {
  children: 'Bordered Tag',
  bordered: true,
}

export const Closable = Template.bind({})
Closable.args = {
  children: 'Closable Tag',
  closable: true,
}

export const CustomIcon = Template.bind({})
CustomIcon.args = {
  children: 'Custom Icon Tag',
  icon: (
    <span role="img" aria-label="star">
      &#9733;
    </span>
  ),
}
