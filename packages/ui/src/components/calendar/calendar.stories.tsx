import { ComponentStory, Meta } from '@storybook/react'

import { Calendar, CalendarProps } from './calendar'
import { StoriesThemeWrapper, disableArgTypesTableControl } from '../../__storybook__'

export default {
  title: 'Calendar',
  component: Calendar,
  argTypes: {
    dateCellRender: {
      description:
        'Customize the display of the date cell, the returned content will be appended to the cell',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    dateFullCellRender: {
      description:
        'Customize the display of the date cell, the returned content will override the cell',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    defaultValue: {
      description: 'The date selected by default',
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: 'Current DateTime',
        },
      },
    },
    disabledDate: {
      description:
        "Function that specifies the dates that cannot be selected, currentDate is same dayjs object as value prop which shouldn't be mutated",
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    fullscreen: {
      description: 'Whether to display in full-screen',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    headerRender: {
      description: 'Render custom header in panel',
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    locale: {
      description: "The calendar's locale",
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: '(default)',
        },
      },
    },
    mode: {
      description: 'The display mode of the calendar',
      table: {
        defaultValue: {
          summary: 'month',
        },
      },
    },
    monthCellRender: {
      description:
        'Customize the display of the month cell, the returned content will be appended to the cell',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    monthFullCellRender: {
      description:
        'Customize the display of the month cell, the returned content will override the cell',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    validRange: {
      description: 'To set valid range',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    value: {
      description: 'The current selected date',
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: 'Current DateTime',
        },
      },
    },
    onChange: {
      description: 'Callback for when date changes',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onPanelChange: {
      description: 'Callback for when panel changes',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onSelect: {
      description: 'Callback for when a date is selected, include source info',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
  },
} as Meta<CalendarProps>

const Template: ComponentStory<typeof Calendar> = (args: CalendarProps) => (
  <StoriesThemeWrapper>
    <Calendar {...args} />
  </StoriesThemeWrapper>
)

export const Default = Template.bind({})
export const DisabledFullscreen = Template.bind({})

Default.args = {}
DisabledFullscreen.args = { fullscreen: false }
