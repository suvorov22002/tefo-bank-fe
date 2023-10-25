import { ComponentStory, Meta } from '@storybook/react'

import { Button } from '../button'
import { Dropdown, DropdownProps } from './dropdown'
import {
  StoriesThemeWrapper,
  disableArgTypesTableControl,
  setArgTypesBooleanControl,
} from '../../__storybook__'

export default {
  title: 'Dropdown',
  component: Dropdown,
  argTypes: {
    arrow: {
      ...setArgTypesBooleanControl,
      description: 'Whether the dropdown arrow should be visible',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    autoAdjustOverflow: {
      ...setArgTypesBooleanControl,
      description: 'Whether to adjust dropdown placement automatically when dropdown is off screen',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    autoFocus: {
      description: 'Focus element in overlay when opened',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    disabled: {
      description: 'Whether the dropdown menu is disabled',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    destroyPopupOnHide: {
      description: 'Whether destroy dropdown when hidden',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    dropdownRender: {
      description: 'Customize dropdown content',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    getPopupContainer: {
      description: 'To set the container of the dropdown menu',
      table: {
        defaultValue: {
          summary: '() => document.body',
        },
      },
    },
    menu: {
      description: 'The menu props',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    overlayClassName: {
      description: 'The class name of the dropdown root element',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    overlayStyle: {
      description: 'The style of the dropdown root element',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    placement: {
      description: 'Placement of popup menu',
      table: {
        defaultValue: {
          summary: 'bottomLeft',
        },
      },
    },
    trigger: {
      ...disableArgTypesTableControl,
      description:
        "The trigger mode which executes the dropdown action. Note that hover can't be used on touchscreens",
      table: {
        defaultValue: {
          summary: '[click]',
        },
      },
    },
    open: {
      description: 'Whether the dropdown menu is currently open',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onOpenChange: {
      description: 'Called when the open state is changed. Not trigger when hidden by click item',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    children: {
      ...disableArgTypesTableControl,
      description: '-',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
  },
} as Meta<DropdownProps>

const menuItems = [
  {
    key: 'edit',
    label: 'Edit',
  },
  {
    key: 'delete',
    label: 'Delete',
  },
]

const Template: ComponentStory<typeof Dropdown> = (args: DropdownProps) => (
  <StoriesThemeWrapper>
    <Dropdown {...args} />
  </StoriesThemeWrapper>
)

export const Basic = Template.bind({})
export const TableOptions = Template.bind({})

Basic.args = {
  children: <Button>Click</Button>,
  menu: {
    items: menuItems,
  },
}

TableOptions.args = {
  children: <Button type="link">...</Button>,
  menu: {
    items: menuItems,
  },
}
