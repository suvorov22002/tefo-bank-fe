import { ComponentStory, Meta } from '@storybook/react'

import { formItemCategory } from '../__storybook__'
import { MenuFoldOutlinedIcon, MenuUnfoldOutlinedIcon } from '../../icon'
import { PasswordInput, PasswordInputProps } from './passwordInput'
import {
  StoriesThemeWrapper,
  disableArgTypesTableControl,
  setArgTypesBooleanControl,
  setArgTypesTextControl,
} from '../../../__storybook__'

export default {
  title: 'PasswordInput',
  component: PasswordInput,
  argTypes: {
    iconRender: {
      ...disableArgTypesTableControl,
      description: 'Custom toggle button',
    },
    visibilityToggle: {
      ...setArgTypesBooleanControl,
      description: 'Whether show toggle button or control password visible',
    },
    addonAfter: {
      description: 'The label text displayed after (on the right side of) the input field',
      ...setArgTypesTextControl,
    },
    addonBefore: {
      description: 'The label text displayed before (on the left side of) the input field',
      ...setArgTypesTextControl,
    },
    allowClear: {
      ...setArgTypesBooleanControl,
      description: 'If allow to remove input content with clear icon',
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
    ...formItemCategory,
  },
} as Meta<PasswordInputProps>

const Template: ComponentStory<typeof PasswordInput> = (args: PasswordInputProps) => (
  <StoriesThemeWrapper>
    <PasswordInput {...args} />
  </StoriesThemeWrapper>
)

export const Default = Template.bind({})
export const WithCustomVisibilityToggleIcon = Template.bind({})
export const WithoutVisibilityToggle = Template.bind({})
export const Disabled = Template.bind({})
export const Required = Template.bind({})
export const WithAddonBefore = Template.bind({})
export const WithAddonAfter = Template.bind({})
export const WithClearButton = Template.bind({})
export const WithCount = Template.bind({})

WithCustomVisibilityToggleIcon.args = {
  iconRender: visible => (visible ? <MenuFoldOutlinedIcon /> : <MenuUnfoldOutlinedIcon />),
}

WithoutVisibilityToggle.args = {
  visibilityToggle: false,
}

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

WithClearButton.args = {
  defaultValue: 'Default text',
  allowClear: true,
}

WithCount.args = {
  showCount: true,
}
