import { ComponentStory, Meta } from '@storybook/react'

import { Button } from '../button'
import { Popconfirm, PopconfirmProps } from './popconfirm'
import { StoriesThemeWrapper, disableArgTypesTableControl } from '../../__storybook__'

export default {
  title: 'Popconfirm',
  component: Popconfirm,
  argTypes: {
    cancelButtonProps: {
      description: 'The cancel button props',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    cancelText: {
      description: 'The text of the Cancel button',
      table: {
        defaultValue: {
          summary: 'Cancel',
        },
      },
    },
    disabled: {
      description: 'Whether show popconfirm when click its childrenNode',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    icon: {
      description: 'Customize icon of confirmation',
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: '<ExclamationCircle />',
        },
      },
    },
    okButtonProps: {
      description: 'The ok button props',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    okText: {
      description: 'The text of the Confirm button',
      table: {
        defaultValue: {
          summary: 'OK',
        },
      },
    },
    okType: {
      description: 'Button type of the Confirm button',
      table: {
        defaultValue: {
          summary: 'primary',
        },
      },
    },
    showCancel: {
      description: 'Show cancel button',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    title: {
      description: 'The title of the confirmation box',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    description: {
      description: 'The description of the confirmation box title',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onCancel: {
      description: 'A callback of cancel',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onConfirm: {
      description: 'A callback of confirmation',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onPopupClick: {
      description: 'A callback of popup click',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    children: {
      description: '',
      ...disableArgTypesTableControl,
    },
    placement: {
      description: 'Position to place the Popconfirm relative to its target',
      control: {
        type: 'select',
        options: [
          'top',
          'topRight',
          'topLeft',
          'bottom',
          'bottomRight',
          'bottomLeft',
          'left',
          'right',
        ],
      },
      defaultValue: 'top',
      table: {
        defaultValue: {
          summary: 'top',
        },
      },
    },
  },
} as Meta<PopconfirmProps>

const Template: ComponentStory<typeof Popconfirm> = (args: PopconfirmProps) => (
  <StoriesThemeWrapper>
    <Popconfirm {...args} />
  </StoriesThemeWrapper>
)

export const Basic = Template.bind({})
export const Customized = Template.bind({})

Basic.args = {
  title: 'Popconfirm Title',
  children: <Button>CTA</Button>,
}

Customized.args = {
  title: 'This Could Not Be Changed In The Future',
  description: 'Are You Sure?',
  children: <Button>CTA</Button>,
  okButtonProps: {
    type: 'primary',
    danger: true,
  },
  placement: 'leftTop',
  okText: 'Yes',
  cancelText: 'No',
}
