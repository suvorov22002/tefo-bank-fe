import { ComponentStory, Meta } from '@storybook/react'

import { formItemCategory } from '../__storybook__'
import { CheckboxGroup, CheckboxGroupProps } from './checkboxGroup'
import { StoriesThemeWrapper, setArgTypesTextControl } from '../../../__storybook__'

export default {
  title: 'CheckboxGroup',
  component: CheckboxGroup,
  argTypes: {
    defaultValue: {
      description: 'Default selected value',
      table: {
        defaultValue: {
          summary: '[]',
        },
      },
    },
    disabled: {
      description: 'If disable all checkboxes',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    name: {
      description: 'The `name` property of all `input[type="checkbox"]` children',
    },
    options: {
      description: 'Specifies options',
      table: {
        defaultValue: {
          summary: '[]',
        },
      },
    },
    value: {
      description: 'Used for setting the currently selected value',
      table: {
        defaultValue: {
          summary: '[]',
        },
      },
      ...setArgTypesTextControl,
    },
    onChange: {
      description: 'The callback function that is triggered when the state changes',
    },
    ...formItemCategory,
  },
} as Meta<CheckboxGroupProps>

const Template: ComponentStory<typeof CheckboxGroup> = (args: CheckboxGroupProps) => (
  <StoriesThemeWrapper>
    <CheckboxGroup {...args} />
  </StoriesThemeWrapper>
)

const options = [
  {
    label: 'Apple',
    value: 'APPLE',
  },
  {
    label: 'Orange',
    value: 'ORANGE',
  },
  {
    label: 'Watermelon',
    value: 'WATERMELON',
  },
]

export const Default = Template.bind({})
export const Disabled = Template.bind({})

Default.args = {
  options,
  defaultValue: ['APPLE', 'WATERMELON'],
}

Disabled.args = {
  options,
  disabled: true,
}
