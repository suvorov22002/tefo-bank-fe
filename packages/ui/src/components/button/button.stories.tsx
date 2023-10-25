import { ComponentStory, Meta } from '@storybook/react'

import { Button, ButtonProps } from './button'
import {
  StoriesThemeWrapper,
  disableArgTypesTableControl,
  setArgTypesBooleanControl,
} from '../../__storybook__'

export default {
  title: 'Button',
  component: Button,
  args: {
    children: 'Some text',
  },
  argTypes: {
    block: {
      description: 'Option to fit button width to its parent width',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    className: {
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    danger: {
      description: 'Set the danger status of button',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    disabled: {
      description: 'Disabled state of button',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    ghost: {
      description: 'Make background transparent and invert text and border colors',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    htmlType: {
      description: 'Set the original html type of button',
      table: {
        defaultValue: {
          summary: 'button',
        },
      },
    },
    icon: {
      description: 'Set the icon component of button',
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    loading: {
      description: 'Set the loading status of button',
      ...setArgTypesBooleanControl,
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    shape: {
      description: 'Can be set to',
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    size: {
      description: 'Can be set to',
      table: {
        defaultValue: {
          summary: 'middle',
        },
      },
    },
    style: {
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    type: {
      description: 'Can be set to',
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    onClick: {
      description: 'Set the handler to handle click event',
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
  },
} as Meta<ButtonProps>

const Template: ComponentStory<typeof Button> = (args: ButtonProps) => (
  <StoriesThemeWrapper>
    <Button {...args} />
  </StoriesThemeWrapper>
)

export const Primary = Template.bind({})
export const Default = Template.bind({})
export const Danger = Template.bind({})
export const DangerPrimary = Template.bind({})
export const Ghost = Template.bind({})
export const Dashed = Template.bind({})
export const Link = Template.bind({})
export const Text = Template.bind({})

Primary.args = { type: 'primary' }
Danger.args = { danger: true }
DangerPrimary.args = { danger: true, type: 'primary' }
Ghost.args = { type: 'ghost' }
Dashed.args = { type: 'dashed' }
Link.args = { type: 'link' }
Text.args = { type: 'text' }
