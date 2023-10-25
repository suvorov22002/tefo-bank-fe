import { ComponentStory, Meta } from '@storybook/react'

import { StoriesThemeWrapper } from '../../__storybook__'
import { Badge, BadgeProps } from './badge'

export default {
  title: 'Badge',
  component: Badge,
  argTypes: {
    color: {
      description: 'Customize Badge dot color',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    count: {
      description: 'Number to show in badge',
      control: {
        type: 'number',
      },
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    dot: {
      description: 'Whether to display a red dot instead of count',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    offset: {
      description: 'Set offset of the badge dot',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    overflowCount: {
      description: 'Max count to show',
      table: {
        defaultValue: {
          summary: '99',
        },
      },
    },
    showZero: {
      description: 'Whether to show badge when count is zero',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    size: {
      description: 'If count is set, size sets the size of badge',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    status: {
      description: 'Set Badge as a status dot',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    text: {
      description: 'If status is set, text sets the display text of the status dot',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    title: {
      description: 'Text to show when hovering over the badge',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
  },
} as Meta<BadgeProps>

const Template: ComponentStory<typeof Badge> = (args: BadgeProps) => (
  <StoriesThemeWrapper>
    <Badge {...args} />
  </StoriesThemeWrapper>
)

export const DefaultStatus = Template.bind({})
export const SuccessStatus = Template.bind({})
export const WarningStatus = Template.bind({})
export const ProcessingStatus = Template.bind({})
export const ErrorStatus = Template.bind({})
export const WithCount = Template.bind({})

DefaultStatus.args = {
  status: 'default',
  text: 'Default',
}

SuccessStatus.args = {
  status: 'success',
  text: 'Success',
}

WarningStatus.args = {
  status: 'warning',
  text: 'Warning',
}

ProcessingStatus.args = {
  status: 'processing',
  text: 'Processing',
}

ErrorStatus.args = {
  status: 'error',
  text: 'Error',
}

WithCount.args = {
  count: '7',
}
