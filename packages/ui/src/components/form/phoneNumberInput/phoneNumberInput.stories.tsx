import { ComponentStory, Meta } from '@storybook/react'

import { StoriesThemeWrapper } from '../../../__storybook__'
import { formItemCategory } from '../__storybook__'
import { PhoneNumberInput, PhoneNumberInputProps } from './phoneNumberInput'

export default {
  title: 'PhoneNumberInput',
  component: PhoneNumberInput,
  argTypes: {
    ...formItemCategory,
  },
} as Meta<PhoneNumberInputProps>

const Template: ComponentStory<typeof PhoneNumberInput> = (args: PhoneNumberInputProps) => (
  <StoriesThemeWrapper>
    <div
      style={{
        maxWidth: '400px',
        margin: 'auto',
      }}
    >
      <PhoneNumberInput {...args} />
    </div>
  </StoriesThemeWrapper>
)

export const Default = Template.bind({})
export const Disabled = Template.bind({})

Disabled.args = {
  disabled: true,
}
