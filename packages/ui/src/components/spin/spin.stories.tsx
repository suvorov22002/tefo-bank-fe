import { ComponentStory, Meta } from '@storybook/react'

import { Button } from '../button'
import { Spin, SpinProps } from './spin'
import {
  StoriesThemeWrapper,
  disableArgTypesTableControl,
  setArgTypesTextControl,
} from '../../__storybook__'

export default {
  title: 'Spin',
  component: Spin,
  argTypes: {
    delay: {
      description: 'Specifies a delay in milliseconds for loading state (prevent flush)',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    indicator: {
      description: 'React node of the spinning indicator',
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    size: {
      description: 'The size of Spin, options: small, default and large',
      table: {
        defaultValue: {
          summary: 'large',
        },
      },
    },
    spinning: {
      description: 'Whether Spin is visible',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    tip: {
      description: 'Customize description content when Spin has children',
      ...setArgTypesTextControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    fullscreen: {
      description: 'Covers whole page if enabled',
      control: 'boolean',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    wrapperClassName: {
      description: 'The className of wrapper when Spin has children',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
  },
} as Meta<SpinProps>

const Template: ComponentStory<typeof Spin> = (args: SpinProps) => (
  <StoriesThemeWrapper>
    <Spin {...args} />
  </StoriesThemeWrapper>
)

export const Default = Template.bind({})
export const Custom = Template.bind({})

Default.args = {}
Custom.args = {
  delay: 500,
  size: 'small',
  tip: 'Custom Spin',
  children: <Button type="primary">Button</Button>,
}
