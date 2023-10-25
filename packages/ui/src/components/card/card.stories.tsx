import { ComponentStory, Meta } from '@storybook/react'

import { Card, CardProps } from './card'
import {
  StoriesThemeWrapper,
  disableArgTypesTableControl,
  setArgTypesTextControl,
} from '../../__storybook__'

export default {
  title: 'Card',
  component: Card,
  argTypes: {
    actions: {
      ...disableArgTypesTableControl,
      description: 'The action list, shows at the bottom of the Card',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    activeTabKey: {
      description: "Current TabPane's key",
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    bodyStyle: {
      description: 'Inline style to apply to the card content',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    bordered: {
      description: 'Toggles rendering of the border around the card',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    cover: {
      ...disableArgTypesTableControl,
      description: 'Card cover',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    defaultActiveTabKey: {
      description: "Initial active TabPane's key, if activeTabKey is not set",
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    extra: {
      ...disableArgTypesTableControl,
      description: 'Content to render in the top-right corner of the card',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    headStyle: {
      description: 'Inline style to apply to the card head',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    hoverable: {
      description: 'Lift up when hovering card',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    loading: {
      description: 'Shows a loading indicator while the contents of the card are being fetched',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    size: {
      description: 'Size of card',
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    tabBarExtraContent: {
      ...disableArgTypesTableControl,
      description: 'Extra content in tab bar',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    tabList: {
      ...disableArgTypesTableControl,
      description: "List of TabPane's head",
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    tabProps: {
      ...disableArgTypesTableControl,
      description: 'Tabs',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    title: {
      ...setArgTypesTextControl,
      description: 'Card title',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    type: {
      ...setArgTypesTextControl,
      description: 'Card style type, can be set to inner or not set',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    children: {
      ...setArgTypesTextControl,
      description: '-',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onTabChange: {
      description: 'Callback when tab is switched',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
  },
} as Meta<CardProps>

const Template: ComponentStory<typeof Card> = (args: CardProps) => (
  <StoriesThemeWrapper>
    <Card {...args} />
  </StoriesThemeWrapper>
)

export const Basic = Template.bind({})
export const Custom = Template.bind({})

Basic.args = {
  children: 'Basic Card',
}
Custom.args = {
  title: 'Custom Card',
  bordered: true,
  hoverable: true,
  type: 'inner',
  children: 'Custom card content',
  actions: ['Action 1', 'Action 2', 'Action 3'],
}
