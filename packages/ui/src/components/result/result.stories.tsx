import { ComponentStory, Meta } from '@storybook/react'

import { Button } from '../button'
import { Result, ResultProps } from './result'
import {
  StoriesThemeWrapper,
  disableArgTypesTableControl,
  setArgTypesTextControl,
} from '../../__storybook__'

export default {
  title: 'Result',
  component: Result,
  argTypes: {
    title: {
      description: 'The title',
      ...setArgTypesTextControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    subTitle: {
      description: 'The subTitle',
      ...setArgTypesTextControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    status: {
      description: 'Result status, decide icons and colors',
      table: {
        defaultValue: {
          summary: 'info',
        },
      },
    },
    icon: {
      description: 'Custom back icon',
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    extra: {
      description: 'Operating area',
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
  },
} as Meta<ResultProps>

const Template: ComponentStory<typeof Result> = (args: ResultProps) => (
  <StoriesThemeWrapper>
    <Result {...args} />
  </StoriesThemeWrapper>
)

export const Basic = Template.bind({})
export const Error = Template.bind({})

Basic.args = {
  title: 'Successfully Created Bank Profile',
  status: 'success',
  extra: <Button type="primary">Go To The Bank Settings</Button>,
}

Error.args = {
  title: 'Failed to Create Bank Profile',
  status: 'error',
  extra: <Button type="primary">Go To The Bank Settings</Button>,
  children: 'Something went wrong',
}
