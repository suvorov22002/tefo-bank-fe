import { ComponentStory, Meta } from '@storybook/react'

import { formItemCategory } from '../__storybook__'
import { DatePicker, DatePickerProps } from './datePicker'
import { StoriesThemeWrapper, disableArgTypesTableControl } from '../../../__storybook__'

export default {
  title: 'DatePicker',
  component: DatePicker,
  argTypes: {
    allowClear: {
      description: 'Whether to show clear button',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    autoFocus: {
      description: 'If get focus when component mounted',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    bordered: {
      description: 'Whether has border style',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    className: {
      description: 'The picker className',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    dateRender: {
      ...disableArgTypesTableControl,
      description: 'Custom rendering function for date cells, >= 5.4.0 use cellRender instead.',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    changeOnBlur: {
      description: 'Trigger change when blur. e.g. datetime picker no need click confirm button',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    cellRender: {
      ...disableArgTypesTableControl,
      description: 'Custom rendering function for picker cells',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    disabled: {
      description: 'Determine whether the DatePicker is disabled',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    disabledDate: {
      description: 'Specify the date that cannot be selected',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    format: {
      description:
        'To set the date format, support multi-format matching when it is an array, display the first one shall prevail. refer to dayjs#format. for example: Custom Format',
      table: {
        defaultValue: {
          summary: 'rc-picker',
        },
      },
    },
    popupClassName: {
      description: 'To customize the className of the popup calendar',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    getPopupContainer: {
      ...disableArgTypesTableControl,
      description:
        'To set the container of the floating layer, while the default is to create a div element in body',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    inputReadOnly: {
      description:
        'Set the readonly attribute of the input tag (avoids virtual keyboard on touch devices)',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    locale: {
      description: 'Localization configuration',
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    mode: {
      description: 'The picker panel mode',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    nextIcon: {
      description: 'The custom next icon',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    open: {
      description: 'The open state of picker',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    panelRender: {
      ...disableArgTypesTableControl,
      description: 'Customize panel render',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    picker: {
      description: 'Set picker type',
      table: {
        defaultValue: {
          summary: 'date',
        },
      },
    },
    placeholder: {
      description: 'The placeholder of date input',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    placement: {
      description: 'The position where the selection box pops up',
      table: {
        defaultValue: {
          summary: 'bottomLeft',
        },
      },
    },
    popupStyle: {
      description: 'To customize the style of the popup calendar',
      table: {
        defaultValue: {
          summary: '{}',
        },
      },
    },
    presets: {
      description: 'The preset ranges for quick selection',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    prevIcon: {
      description: 'The custom prev icon',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    size: {
      description:
        'To determine the size of the input box, the height of large and small, are 40px and 24px respectively, while default size is 32px',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    status: {
      description: 'Set validation status',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    style: {
      description: 'To customize the style of the input box',
      table: {
        defaultValue: {
          summary: '{}',
        },
      },
    },
    suffixIcon: {
      description: 'The custom suffix icon',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    superNextIcon: {
      description: 'The custom super next icon',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    superPrevIcon: {
      description: 'The custom super prev icon',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onOpenChange: {
      ...disableArgTypesTableControl,
      description:
        'Callback function, can be executed whether the popup calendar is popped up or closed',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onPanelChange: {
      ...disableArgTypesTableControl,
      description: 'Callback when picker panel mode is changed',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },

    defaultPickerValue: {
      description: 'To set default picker date',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    defaultValue: {
      description:
        'To set default date, if start time or end time is null or undefined, the date range will be an open interval',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    disabledTime: {
      description: 'To specify the time that cannot be selected',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    renderExtraFooter: {
      description: 'Render extra footer in panel',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    showNow: {
      description: "Whether to show 'Now' button on panel when showTime is set",
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    showTime: {
      description: 'To provide an additional time selection',
      table: {
        defaultValue: {
          summary: 'TimePicker Options',
        },
      },
    },
    'showTime.defaultValue': {
      description: 'To set default time of selected date, demo',
      table: {
        defaultValue: {
          summary: 'dayjs()',
        },
      },
    },
    showToday: {
      description: 'Whether to show Today button',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    value: {
      description: 'To set date',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onChange: {
      ...disableArgTypesTableControl,
      description: 'Callback function, can be executed when the selected time is changing',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onOk: {
      ...disableArgTypesTableControl,
      description: 'Callback when click ok button',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onFocus: {
      ...disableArgTypesTableControl,
    },
    onBlur: {
      ...disableArgTypesTableControl,
    },
    onContextMenu: {
      ...disableArgTypesTableControl,
    },
    onMouseDown: {
      ...disableArgTypesTableControl,
    },
    onMouseEnter: {
      ...disableArgTypesTableControl,
    },
    onMouseLeave: {
      ...disableArgTypesTableControl,
    },
    onMouseUp: {
      ...disableArgTypesTableControl,
    },
    onClick: {
      ...disableArgTypesTableControl,
    },
    ...formItemCategory,
  },
} as Meta<DatePickerProps>

const Template: ComponentStory<typeof DatePicker> = (args: DatePickerProps) => (
  <StoriesThemeWrapper>
    <DatePicker {...args} />
  </StoriesThemeWrapper>
)

export const Default = Template.bind({})
export const Disabled = Template.bind({})
export const Month = Template.bind({})
export const Week = Template.bind({})
export const Time = Template.bind({})

Disabled.args = {
  disabled: true,
}

Month.args = {
  picker: 'month',
}

Week.args = {
  picker: 'week',
}

Time.args = {
  picker: 'time',
}
