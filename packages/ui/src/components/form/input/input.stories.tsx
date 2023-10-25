import { ComponentStory, Meta } from '@storybook/react'

import { formItemCategory } from '../__storybook__'
import { Input, InputProps } from './input'
import {
  StoriesThemeWrapper,
  disableArgTypesTableControl,
  setArgTypesTextControl,
} from '../../../__storybook__'

export default {
  title: 'Input',
  component: Input,
  argTypes: {
    addonAfter: {
      description: 'The label text displayed after (on the right side of) the input field',
      ...setArgTypesTextControl,
    },
    addonBefore: {
      description: 'The label text displayed before (on the left side of) the input field',
      ...setArgTypesTextControl,
    },
    allowClear: {
      description: 'If allow to remove input content with clear icon',
      control: 'boolean',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    suffix: {
      description: 'The suffix icon for the Input',
      ...setArgTypesTextControl,
    },
    prefix: {
      description: 'The prefix icon for the Input',
      ...setArgTypesTextControl,
    },
    value: {
      description: 'The input content value',
      ...setArgTypesTextControl,
    },
    defaultValue: {
      description: 'The input content default value',
      ...setArgTypesTextControl,
    },
    onChange: {
      description: 'Handle change',
      ...disableArgTypesTableControl,
    },
    onBlur: {
      description: 'Handle blur',
      ...disableArgTypesTableControl,
    },
    bordered: {
      description: 'Whether has border style',
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    disabled: {
      description: ' Whether the input is disabled',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    id: {
      description: 'The ID for input',
    },
    maxLength: {
      description: 'The max length',
    },
    showCount: {
      description: 'Whether show text count',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    status: {
      description: 'Set validation status',
    },
    size: {
      description:
        'The size of the input box. Note: in the context of a form, the middle size is used',
    },
    type: {
      description: 'The type of input',
      table: {
        defaultValue: {
          summary: '"text"',
        },
      },
    },
    ...formItemCategory,
  },
} as Meta<InputProps>

const Template: ComponentStory<typeof Input> = (args: InputProps) => (
  <StoriesThemeWrapper>
    <Input {...args} />
  </StoriesThemeWrapper>
)

export const Default = Template.bind({})
export const Disabled = Template.bind({})
export const Required = Template.bind({})
export const WithAddonBefore = Template.bind({})
export const WithAddonAfter = Template.bind({})
export const WithClearButton = Template.bind({})
export const WithCount = Template.bind({})
export const WithPrefix = Template.bind({})
export const WithSuffix = Template.bind({})

Required.args = {
  label: 'Default label',
  required: true,
}

Disabled.args = {
  disabled: true,
}

WithAddonBefore.args = {
  addonBefore: 'Addon before',
}

WithAddonAfter.args = {
  addonAfter: 'Addon after',
}

WithClearButton.args = {
  defaultValue: 'Default text',
  allowClear: true,
}

WithCount.args = {
  showCount: true,
}

WithPrefix.args = {
  prefix: 'prefix',
}

WithSuffix.args = {
  suffix: 'suffix',
}
