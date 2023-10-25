import { ComponentStory, Meta } from '@storybook/react'

import { Divider, DividerProps } from './divider'
import { StoriesThemeWrapper, disableArgTypesTableControl } from '../../__storybook__'

export default {
  title: 'Divider',
  component: Divider,
  argTypes: {
    children: {
      description: 'The wrapped title',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    className: {
      ...disableArgTypesTableControl,
      description: 'The className of container',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    dashed: {
      description: 'Whether line is dashed',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    orientation: {
      description: 'The position of title inside divider',
      table: {
        defaultValue: {
          summary: 'center',
        },
      },
    },
    orientationMargin: {
      description:
        'The margin-left/right between the title and its closest border, while the orientation must be left or right',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    plain: {
      description: 'Divider text show as plain style',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    style: {
      description: 'The style object of container',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    type: {
      description: 'The direction type of divider',
      table: {
        defaultValue: {
          summary: 'horizontal',
        },
      },
    },
  },
} as Meta<DividerProps>

const Template: ComponentStory<typeof Divider> = (args: DividerProps) => (
  <StoriesThemeWrapper>
    <Divider {...args} />
  </StoriesThemeWrapper>
)

export const HorizontalDefault = Template.bind({})
export const VerticalDefault = Template.bind({})
export const HorizontalDashed = Template.bind({})
export const VerticalDashed = Template.bind({})
export const WithText = Template.bind({})
export const WithLeftText = Template.bind({})
export const WithRightText = Template.bind({})

VerticalDefault.args = {
  type: 'vertical',
}

HorizontalDashed.args = {
  dashed: true,
}

VerticalDashed.args = {
  type: 'vertical',
  dashed: true,
}

WithText.args = {
  children: 'Text',
}

WithLeftText.args = {
  children: 'Left text',
  orientation: 'left',
}
WithRightText.args = {
  children: 'Right text',
  orientation: 'right',
}
