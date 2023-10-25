import { ComponentStory, Meta } from '@storybook/react'

import { Collapse, CollapseProps, Panel } from './collapse'
import { StoriesThemeWrapper, disableArgTypesTableControl } from '../../__storybook__'

export default {
  title: 'Collapse',
  component: Collapse,
  argTypes: {
    children: {
      ...disableArgTypesTableControl,
      description: 'Collapse inner content',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    className: {
      ...disableArgTypesTableControl,
      description: 'Collapse class name',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    accordion: {
      description: 'If true, Collapse renders as Accordion',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    activeKey: {
      description: 'Key of the active panel',
      table: {
        defaultValue: {
          summary: "No default value. In accordion mode, it's the key of the first panel",
        },
      },
    },
    bordered: {
      description: 'Toggles rendering of the border around the collapse block',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    collapsible: {
      description:
        'Specify whether the panels of children be collapsible or the trigger area of collapsible',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    defaultActiveKey: {
      description: 'Key of the initial active panel',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    destroyInactivePanel: {
      description: 'Destroy Inactive Panel',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    expandIcon: {
      description: 'Allow to customize collapse icon',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    expandIconPosition: {
      description: 'Set expand icon position',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    ghost: {
      description: 'Make the collapse borderless and its background transparent',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    size: {
      description: 'Set the size of collapse',
      table: {
        defaultValue: {
          summary: 'middle',
        },
      },
    },
    onChange: {
      description: 'Callback function executed when active panel is changed',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
  },
  subcomponents: {
    Panel,
  },
} as Meta<CollapseProps>

const Template: ComponentStory<typeof Collapse> = (args: CollapseProps) => (
  <StoriesThemeWrapper>
    <Collapse {...args} />
  </StoriesThemeWrapper>
)

export const Basic = Template.bind({})
export const Disabled = Template.bind({})

Basic.args = {
  defaultActiveKey: 2,
  children: (
    <>
      <Panel key="1" header="First Panel">
        First panel content
      </Panel>
      <Panel key="2" header="Second Panel">
        Second panel content
      </Panel>
      <Panel key="3" header="Third Panel">
        Third panel content
      </Panel>
    </>
  ),
}

Disabled.args = {
  collapsible: 'disabled',
  children: (
    <>
      <Panel key="1" header="First Panel">
        First panel content
      </Panel>
      <Panel key="2" header="Second Panel">
        Second panel content
      </Panel>
      <Panel key="3" header="Third Panel">
        Third panel content
      </Panel>
    </>
  ),
}
