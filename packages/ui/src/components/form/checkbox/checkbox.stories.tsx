import { ComponentStory, Meta } from '@storybook/react'

import { formItemCategory } from '../__storybook__'
import { Checkbox, CheckboxProps } from './checkbox'
import { StoriesThemeWrapper, disableArgTypesTableControl } from '../../../__storybook__'

export default {
  title: 'Checkbox',
  component: Checkbox,
  argTypes: {
    autoFocus: {
      table: {
        defaultValue: {
          summary: false,
        },
      },
      description: 'If get focus when component mounted',
    },
    checked: {
      description: 'Specifies whether the checkbox is selected',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    defaultChecked: {
      description: 'whether or not the checkbox is selected',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    disabled: {
      description: 'disabled',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    indeterminate: {
      description: 'The indeterminate checked state of checkbox',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    onChange: {
      description: 'The callback function that is triggered when the state changes ',
    },
    onClick: {
      ...disableArgTypesTableControl,
    },
    ...formItemCategory,
  },
} as Meta<CheckboxProps>

const Template: ComponentStory<typeof Checkbox> = (args: CheckboxProps) => (
  <StoriesThemeWrapper>
    <Checkbox {...args} />
  </StoriesThemeWrapper>
)

export const Default = Template.bind({})
export const Disabled = Template.bind({})

Disabled.args = {
  disabled: true,
}
