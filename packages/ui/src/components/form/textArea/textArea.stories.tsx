import { ComponentStory, Meta } from '@storybook/react'

import { formItemCategory } from '../__storybook__'
import {
  StoriesThemeWrapper,
  disableArgTypesTableControl,
  setArgTypesBooleanControl,
  setArgTypesTextControl,
} from '../../../__storybook__'
import { TextArea, TextAreaProps } from './textArea'

export default {
  title: 'TextArea',
  component: TextArea,
  argTypes: {
    allowClear: {
      description: 'If allow to remove input content with clear icon',
      ...setArgTypesBooleanControl,
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    autoSize: {
      description:
        'Height auto-size feature, can be set to true | false or an object { minRows: 2, maxRows: 6 }',
      ...setArgTypesBooleanControl,
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    bordered: {
      description: 'Whether has border style',
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    defaultValue: {
      description: 'The initial input content',
      ...setArgTypesTextControl,
    },
    maxLength: {
      description: 'The maximum number of characters in TextArea',
    },
    showCount: {
      description: 'Whether show text count',
      ...setArgTypesBooleanControl,
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    value: {
      description: 'The input content value',
      ...setArgTypesTextControl,
    },
    disabled: {
      description: 'Whether the input is disabled',
      ...setArgTypesBooleanControl,
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    size: {
      description:
        'The size of the input box. Note: in the context of a form, the middle size is used',
    },
    onChange: {
      description: 'Handle change',
      ...disableArgTypesTableControl,
    },
    onBlur: {
      description: 'Handle blur',
      ...disableArgTypesTableControl,
    },
    onPressEnter: {
      description: 'The callback function that is triggered when Enter key is pressed',
      ...disableArgTypesTableControl,
    },
    onResize: {
      description: 'The callback function that is triggered when resize',
      ...disableArgTypesTableControl,
    },
    ...formItemCategory,
  },
} as Meta<TextAreaProps>

const Template: ComponentStory<typeof TextArea> = (args: TextAreaProps) => (
  <StoriesThemeWrapper>
    <TextArea {...args} />
  </StoriesThemeWrapper>
)

export const Default = Template.bind({})
export const Disabled = Template.bind({})
export const Required = Template.bind({})
export const WithClearButton = Template.bind({})
export const WithCount = Template.bind({})

Required.args = {
  label: 'Default label',
  required: true,
}

Disabled.args = {
  disabled: true,
}

WithClearButton.args = {
  defaultValue: 'Default text',
  allowClear: true,
}

WithCount.args = {
  showCount: true,
}
