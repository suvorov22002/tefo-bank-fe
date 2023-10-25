import { ComponentStory, Meta } from '@storybook/react'

import { formItemCategory } from '../__storybook__'
import { InputNumberPercent, InputNumberPercentProps } from './inputNumberPercent'
import {
  StoriesThemeWrapper,
  disableArgTypesTableControl,
  setArgTypesBooleanControl,
  setArgTypesNumberControl,
  setArgTypesTextControl,
} from '../../../__storybook__'

export default {
  title: 'InputNumberPercent',
  component: InputNumberPercent,
  argTypes: {
    addonAfter: {
      ...setArgTypesTextControl,
      description: 'The label text displayed after (on the right side of) the input field',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    addonBefore: {
      ...setArgTypesTextControl,
      description: 'The label text displayed before (on the left side of) the input field',
      table: {
        defaultValue: {
          summary: '-',
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
    controls: {
      ...setArgTypesBooleanControl,
      description: 'Whether to show +- controls, or set custom arrows icon',
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    decimalSeparator: {
      description: 'Decimal separator',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    defaultValue: {
      ...setArgTypesNumberControl,
      description: 'The initial value',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    disabled: {
      description: 'Disable the input',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    keyboard: {
      description: 'If enable keyboard behavior',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    max: {
      ...setArgTypesNumberControl,
      description: 'The max value',
      table: {
        defaultValue: {
          summary: 'Number.MAX_SAFE_INTEGER',
        },
      },
    },
    min: {
      ...setArgTypesNumberControl,
      description: 'The min value',
      table: {
        defaultValue: {
          summary: 'Number.MIN_SAFE_INTEGER',
        },
      },
    },
    precision: {
      description: 'The precision of input value. Will use formatter when config of formatter',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    readOnly: {
      description: 'If readonly the input',
      table: {
        defaultValue: {
          summary: 'false',
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
    prefix: {
      ...setArgTypesTextControl,
      description: 'The prefix icon for the Input',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    size: {
      description: 'The height of input box',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    step: {
      ...setArgTypesNumberControl,
      description:
        'The number to which the current value is increased or decreased. It can be an integer or decimal',
      table: {
        defaultValue: {
          summary: '1',
        },
      },
    },
    stringMode: {
      description:
        'Set value as string to support high precision decimals. Will return string value by onChange',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    value: {
      ...setArgTypesTextControl,
      description: 'The current value',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onChange: {
      ...disableArgTypesTableControl,
      description: 'The callback triggered when the value is changed',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onPressEnter: {
      ...disableArgTypesTableControl,
      description: 'The callback function that is triggered when Enter key is pressed',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onStep: {
      ...disableArgTypesTableControl,
      description: 'The callback function that is triggered when click up or down buttons',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    ...formItemCategory,
  },
} as Meta<InputNumberPercentProps>

const Template: ComponentStory<typeof InputNumberPercent> = (args: InputNumberPercentProps) => (
  <StoriesThemeWrapper>
    <InputNumberPercent {...args} />
  </StoriesThemeWrapper>
)

export const Default = Template.bind({})
export const Disabled = Template.bind({})
export const Required = Template.bind({})
export const WithAddonBefore = Template.bind({})
export const WithAddonAfter = Template.bind({})
export const WithPrefix = Template.bind({})

Default.args = {}

Disabled.args = {
  disabled: true,
}

Required.args = {
  label: 'Default label',
  required: true,
}

WithAddonBefore.args = {
  addonBefore: 'Addon before',
}

WithAddonAfter.args = {
  addonAfter: 'Addon after',
}

WithPrefix.args = {
  prefix: 'prefix',
}
