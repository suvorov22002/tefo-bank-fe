import { ComponentStory, Meta } from '@storybook/react'

import { StoriesThemeWrapper, disableArgTypesTableControl } from '../../__storybook__'
import { Tabs, TabsProps } from './tabs'

export default {
  title: 'Tabs',
  component: Tabs,
  argTypes: {
    activeKey: {
      description: "Current TabPane's key",
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    addIcon: {
      ...disableArgTypesTableControl,
      description: 'Customize add icon',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    animated: {
      description: 'Whether to change tabs with animation. Only works while tabPosition=top',
      table: {
        defaultValue: {
          summary: '{ inkBar: true, tabPane: false }',
        },
      },
    },
    centered: {
      description: 'Centers tabs',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    defaultActiveKey: {
      description: "Initial active TabPane's key, if activeKey is not set",
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    hideAdd: {
      description: 'Hide plus icon or not. Only works while type=editable-card',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    items: {
      description: 'Configure tab content',
      table: {
        defaultValue: {
          summary: '[]',
        },
      },
    },
    moreIcon: {
      ...disableArgTypesTableControl,
      description: 'The custom icon of ellipsis',
      table: {
        defaultValue: {
          summary: '<EllipsisOutlined />',
        },
      },
    },
    popupClassName: {
      description: 'className for more dropdown.',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    renderTabBar: {
      ...disableArgTypesTableControl,
      description: 'Replace the TabBar',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    size: {
      description: 'Preset tab bar size',
      table: {
        defaultValue: {
          summary: 'middle',
        },
      },
    },
    tabBarExtraContent: {
      description: 'Extra content in tab bar',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    tabBarGutter: {
      description: 'The gap between tabs',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    tabBarStyle: {
      description: 'Tab bar style object',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    tabPosition: {
      description: 'Position of tabs',
      table: {
        defaultValue: {
          summary: 'top',
        },
      },
    },
    destroyInactiveTabPane: {
      description: 'Whether destroy inactive TabPane when change tab',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    type: {
      description: 'Basic style of tabs',
      table: {
        defaultValue: {
          summary: 'line',
        },
      },
    },
    onChange: {
      ...disableArgTypesTableControl,
      description: 'Callback executed when active tab is changed',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onEdit: {
      ...disableArgTypesTableControl,
      description:
        'Callback executed when tab is added or removed. Only works while type=editable-card',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onTabClick: {
      ...disableArgTypesTableControl,
      description: 'Callback executed when tab is clicked',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onTabScroll: {
      ...disableArgTypesTableControl,
      description: 'Trigger when tab scroll',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
  },
} as Meta<TabsProps>

const Template: ComponentStory<typeof Tabs> = (args: TabsProps) => (
  <StoriesThemeWrapper>
    <Tabs {...args} />
  </StoriesThemeWrapper>
)

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `Tab 1`,
    children: `Content of Tab Pane 1`,
  },
  {
    key: '2',
    label: `Tab 2`,
    children: `Content of Tab Pane 2`,
  },
  {
    key: '3',
    label: `Tab 3`,
    children: `Content of Tab Pane 3`,
  },
]

export const WithTabPositionTop = Template.bind({})
export const WithTabPositionLeft = Template.bind({})
export const WithTabPositionBottom = Template.bind({})
export const WithTabPositionRight = Template.bind({})
export const Centered = Template.bind({})

export const WithDisabledTab = Template.bind({})
WithTabPositionTop.args = {
  items,
  tabPosition: 'top',
}

WithTabPositionLeft.args = {
  items,
  tabPosition: 'left',
}

WithTabPositionBottom.args = {
  items,
  tabPosition: 'bottom',
}

WithTabPositionRight.args = {
  items,
  tabPosition: 'right',
}

WithDisabledTab.args = {
  items: [
    ...items,
    { key: '4', label: 'Tab 4', children: 'Content of Tab Pane 4', disabled: true },
  ],
}

Centered.args = {
  items,
  centered: true,
}
