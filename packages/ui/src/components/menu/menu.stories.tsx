import { ComponentStory, Meta } from '@storybook/react'

import { Menu, MenuProps } from './menu'
import { StoriesThemeWrapper, disableArgTypesTableControl } from '../../__storybook__'

export default {
  title: 'Menu',
  component: Menu,
  argTypes: {
    defaultOpenKeys: {
      control: 'object',
      description: 'Array with the keys of default opened sub menus',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    defaultSelectedKeys: {
      control: 'object',
      description: 'Array with the keys of default selected menu items',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    expandIcon: {
      description: 'custom expand icon of submenu',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    forceSubMenuRender: {
      description: 'Render submenu into DOM before it becomes visible',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    inlineCollapsed: {
      description: 'Specifies the collapsed status when menu is inline mode',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    inlineIndent: {
      description: 'Indent (in pixels) of inline menu items on each level',
      table: {
        defaultValue: {
          summary: '24',
        },
      },
    },
    items: {
      description: 'Menu item content',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    mode: {
      description: 'Type of menu',
      table: {
        defaultValue: {
          summary: 'vertical',
        },
      },
    },
    multiple: {
      description: 'Allows selection of multiple items',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    openKeys: {
      control: 'object',
      description: 'Array with the keys of currently opened sub-menus',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    overflowedIndicator: {
      ...disableArgTypesTableControl,
      description: 'Customized the ellipsis icon when menu is collapsed horizontally',
      table: {
        defaultValue: {
          summary: '<EllipsisOutlined />',
        },
      },
    },
    selectable: {
      description: 'Allows selecting menu items',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    selectedKeys: {
      control: 'object',
      description: 'Array with the keys of currently selected menu items',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    style: {
      description: 'Style of the root node',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    subMenuCloseDelay: {
      description: 'Delay time to hide submenu when mouse leaves (in seconds)',
      table: {
        defaultValue: {
          summary: '0.1',
        },
      },
    },
    subMenuOpenDelay: {
      description: 'Delay time to show submenu when mouse enters, (in seconds)',
      table: {
        defaultValue: {
          summary: '0',
        },
      },
    },
    theme: {
      description: 'Color theme of the menu',
      table: {
        defaultValue: {
          summary: 'light',
        },
      },
    },
    triggerSubMenuAction: {
      description: 'Which action can trigger submenu open/close',
      table: {
        defaultValue: {
          summary: 'hover',
        },
      },
    },
    onClick: {
      ...disableArgTypesTableControl,
      description: 'Called when a menu item is clicked',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onDeselect: {
      ...disableArgTypesTableControl,
      description: 'Called when a menu item is deselected (multiple mode only)',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onOpenChange: {
      ...disableArgTypesTableControl,
      description: 'Called when sub-menus are opened or closed',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onSelect: {
      ...disableArgTypesTableControl,
      description: 'Called when a menu item is selected',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },

    danger: {
      description: 'Display the danger style',
      table: {
        category: 'Menu Item Type',
        defaultValue: {
          summary: 'false',
        },
      },
    },
    disabled: {
      description: 'Whether menu item is disabled',
      table: {
        category: 'Menu Item Type',
        defaultValue: {
          summary: 'false',
        },
      },
    },
    icon: {
      description: 'The icon of the menu item',
      table: {
        category: 'Menu Item Type',
        defaultValue: {
          summary: '-',
        },
      },
    },
    key: {
      description: 'Unique ID of the menu item',
      table: {
        category: 'Menu Item Type',
        defaultValue: {
          summary: '-',
        },
      },
    },
    label: {
      description: 'Menu label',
      table: {
        category: 'Menu Item Type',
        defaultValue: {
          summary: '-',
        },
      },
    },
    title: {
      description: 'Set display title for collapsed item',
      table: {
        category: 'Menu Item Type',
        defaultValue: {
          summary: '-',
        },
      },
    },
  },
} as Meta<MenuProps>

const menuItems = [
  {
    label: 'Navigation One',
    key: 'mail',
  },
  {
    label: 'Navigation Two',
    key: 'app',
    disabled: true,
  },
  {
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
]

const Template: ComponentStory<typeof Menu> = (args: MenuProps) => (
  <StoriesThemeWrapper>
    <Menu {...args} />
  </StoriesThemeWrapper>
)

export const Horizontal = Template.bind({})
export const Inline = Template.bind({})
export const Vertical = Template.bind({})

Horizontal.args = {
  items: menuItems,
  mode: 'horizontal',
}

Inline.args = {
  items: menuItems,
  mode: 'inline',
  style: {
    width: 256,
  },
}

Vertical.args = {
  items: menuItems,
  mode: 'vertical',
  style: {
    width: 256,
  },
}
