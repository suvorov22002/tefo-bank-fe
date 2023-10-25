import { ComponentStory, Meta } from '@storybook/react'

import { StoriesThemeWrapper } from '../../__storybook__'
import { Steps, StepsProps } from './steps'

export default {
  title: 'Steps',
  component: Steps,
  argTypes: {
    className: {
      description: 'Additional class to Steps',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    current: {
      description:
        'To set the current step, counting from 0. You can overwrite this state by using status of Step',
      table: {
        defaultValue: {
          summary: '0',
        },
      },
    },
    direction: {
      description: 'To specify the direction of the step bar, horizontal or vertical',
      table: {
        defaultValue: {
          summary: 'horizontal',
        },
      },
    },
    initial: {
      description: 'Set the initial step, counting from 0',
      table: {
        defaultValue: {
          summary: '0',
        },
      },
    },
    labelPlacement: {
      description: 'Place title and description with horizontal or vertical direction',
      table: {
        defaultValue: {
          summary: 'horizontal',
        },
      },
    },
    percent: {
      description:
        'Progress circle percentage of current step in process status (only works on basic Steps)',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    progressDot: {
      description:
        'Steps with progress dot style, customize the progress dot by setting it to a function. labelPlacement will be vertical',
      control: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    responsive: {
      description: 'Change to vertical direction when screen width smaller than 532px',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    size: {
      description: 'To specify the size of the step bar, default and small are currently supported',
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    status: {
      description:
        'To specify the status of current step, can be set to one of the following values: wait process finish error',
      table: {
        defaultValue: {
          summary: 'process',
        },
      },
    },
    type: {
      description:
        'Type of steps, can be set to one of the following values: default navigation inline',
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    onChange: {
      description: 'Trigger when Step is changed',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    items: {
      description: 'StepItem content',
      table: {
        defaultValue: {
          summary: '[]',
        },
      },
    },
  },
} as Meta<StepsProps>

const Template: ComponentStory<typeof Steps> = (args: StepsProps) => (
  <StoriesThemeWrapper>
    <Steps {...args} />
  </StoriesThemeWrapper>
)

export const Default = Template.bind({})

Default.args = {
  current: 1,
  items: [
    {
      title: 'Finished',
      description: 'This is a description.',
    },
    {
      title: 'In Progress',
      description: 'This is a description.',
      subTitle: 'Left 00:00:08',
    },
    {
      title: 'Waiting',
      description: 'This is a description.',
    },
  ],
}
