import { ComponentStory, Meta } from '@storybook/react'

import { InfoCircleOutlined } from '../icon'
import { Tooltip, TooltipProps } from './tooltip'

export default {
  title: 'Tooltip',
  component: Tooltip,
  argTypes: {
    align: {
      description:
        "This value will be merged into placement's config, please refer to the settings rc-tooltip",
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    arrow: {
      description:
        "Change arrow's visible state and change whether the arrow is pointed at the center of target.",
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    autoAdjustOverflow: {
      description: 'Whether to adjust popup placement automatically when popup is off screen',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    color: {
      description: 'The background color',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    defaultOpen: {
      description: 'Whether the floating tooltip card is open by default',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    destroyTooltipOnHide: {
      description: 'Whether destroy tooltip when hidden',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    fresh: {
      description:
        'Tooltip will cache content when it is closed by default. Setting this property will always keep updating',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    getPopupContainer: {
      description:
        'The DOM container of the tip, the default behavior is to create a div element in body',
      table: {
        defaultValue: {
          summary: '() => document.body',
        },
      },
    },
    mouseEnterDelay: {
      description: 'Delay in seconds, before tooltip is shown on mouse enter',
      table: {
        defaultValue: {
          summary: '0.1',
        },
      },
    },
    mouseLeaveDelay: {
      description: 'Delay in seconds, before tooltip is hidden on mouse leave',
      table: {
        defaultValue: {
          summary: '0.1',
        },
      },
    },
    overlayClassName: {
      description: 'Class name of the tooltip card',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    overlayStyle: {
      description: 'Style of the tooltip card',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    overlayInnerStyle: {
      description: 'Style of the tooltip inner content',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    placement: {
      description:
        'The position of the tooltip relative to the target, which can be one of top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom',
      table: {
        defaultValue: {
          summary: 'top',
        },
      },
    },
    trigger: {
      description: 'Tooltip trigger mode. Could be multiple by passing an array',
      table: {
        defaultValue: {
          summary: 'hover',
        },
      },
    },
    open: {
      description:
        'Whether the floating tooltip card is open or not. Use visible under 4.23.0 (why?)',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    zIndex: {
      description: 'Config z-index of Tooltip',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onOpenChange: {
      description: 'Callback executed when visibility of the tooltip card is changed',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
  },
} as Meta<TooltipProps>

const Template: ComponentStory<typeof Tooltip> = (args: TooltipProps) => (
  <div
    style={{
      padding: '24px',
    }}
  >
    <Tooltip {...args} />
  </div>
)

export const Default = Template.bind({})

Default.args = {
  title: 'example',
  trigger: 'hover',
  children: <InfoCircleOutlined />,
}
