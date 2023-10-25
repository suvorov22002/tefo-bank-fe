import { ComponentStory, Meta } from '@storybook/react'

import { formItemCategory } from '../__storybook__'
import { StoriesThemeWrapper, disableArgTypesTableControl } from '../../../__storybook__'
import { TimePicker, TimePickerProps } from './timePicker'

export default {
  title: 'TimePicker',
  component: TimePicker,
  argTypes: {
    allowClear: {
      description: 'Whether allow clearing text',
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
      description: 'The className of picker',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    clearIcon: {
      ...disableArgTypesTableControl,
      description: 'The custom clear icon',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    defaultValue: {
      ...disableArgTypesTableControl,
      description: 'To set default time',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    disabled: {
      description: 'Determine whether the TimePicker is disabled',
      table: {
        defaultValue: {
          summary: 'false',
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
    format: {
      ...disableArgTypesTableControl,
      description: 'To set the time format',
      table: {
        defaultValue: {
          summary: 'HH:mm:ss',
        },
      },
    },
    getPopupContainer: {
      description:
        'To set the container of the floating layer, while the default is to create a div element in body',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    hideDisabledOptions: {
      description: 'Whether hide the options that can not be selected',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    hourStep: {
      description: 'Interval between hours in picker',
      table: {
        defaultValue: {
          summary: '1',
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
    minuteStep: {
      description: 'Interval between minutes in picker',
      table: {
        defaultValue: {
          summary: '1',
        },
      },
    },
    open: {
      description: 'Whether to popup panel',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    placeholder: {
      description: "Display when there's no value",
      table: {
        defaultValue: {
          summary: 'Select a time',
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
    popupClassName: {
      description: 'The className of panel',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    popupStyle: {
      description: 'The style of panel',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    renderExtraFooter: {
      description: 'Called from time picker panel to render some addon to its bottom',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    secondStep: {
      description: 'Interval between seconds in picker',
      table: {
        defaultValue: {
          summary: '1',
        },
      },
    },
    showNow: {
      description: 'Whether to show Now button on panel',
      table: {
        defaultValue: {
          summary: true,
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
    suffixIcon: {
      description: 'The custom suffix icon',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    use12Hours: {
      description: 'Display as 12 hours format, with default format h:mm:ss a',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    value: {
      ...disableArgTypesTableControl,
      description: 'To set time',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onChange: {
      description: 'A callback function, can be executed when the selected time is changing',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onOpenChange: {
      description: 'A callback function which will be called while panel opening/closing',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onSelect: {
      description: 'A callback function, executes when a value is selected',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onBlur: {
      ...disableArgTypesTableControl,
      description: 'A callback function, executes when a picker lose focus',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    ...formItemCategory,
  },
} as Meta<TimePickerProps>

const Template: ComponentStory<typeof TimePicker> = (args: TimePickerProps) => (
  <StoriesThemeWrapper>
    <TimePicker {...args} />
  </StoriesThemeWrapper>
)

export const Default = Template.bind({})
export const Disabled = Template.bind({})
export const WithSteps = Template.bind({})

Disabled.args = {
  disabled: true,
}

WithSteps.args = {
  hourStep: 4,
  minuteStep: 4,
  secondStep: 4,
}
