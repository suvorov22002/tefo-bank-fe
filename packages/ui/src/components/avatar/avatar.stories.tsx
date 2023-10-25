import { ComponentStory, Meta } from '@storybook/react'

import { DashboardOutlinedIcon } from '../icon'
import { Avatar, AvatarProps } from './avatar'
import {
  StoriesThemeWrapper,
  disableArgTypesTableControl,
  setArgTypesBooleanControl,
  setArgTypesNumberControl,
  setArgTypesTextControl,
} from '../../__storybook__'

export default {
  title: 'Avatar',
  component: Avatar,
  argTypes: {
    alt: {
      description: 'This attribute defines the alternative text describing the image',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    gap: {
      ...setArgTypesNumberControl,
      description: 'Letter type unit distance between left and right sides',
      table: {
        defaultValue: {
          summary: '4',
        },
      },
    },
    icon: {
      ...disableArgTypesTableControl,
      description: 'Custom icon type for an icon avatar',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    shape: {
      description: 'The shape of avatar',
      table: {
        defaultValue: {
          summary: 'circle',
        },
      },
    },
    size: {
      ...setArgTypesNumberControl,
      description: 'The size of the avatar. Number or AvatarSize',
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    src: {
      ...disableArgTypesTableControl,
      description: 'The address of the image for an image avatar or image element',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    srcSet: {
      ...disableArgTypesTableControl,
      description: 'A list of sources to use for different screen resolutions',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    draggable: {
      ...setArgTypesBooleanControl,
      description: 'Whether the picture is allowed to be dragged',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    crossOrigin: {
      ...disableArgTypesTableControl,
      description: 'CORS settings attributes',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onError: {
      ...disableArgTypesTableControl,
      description: 'Handler when img load error, return false to prevent default fallback behavior',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    children: {
      ...setArgTypesTextControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
  },
} as Meta<AvatarProps>

const Template: ComponentStory<typeof Avatar> = (args: AvatarProps) => (
  <StoriesThemeWrapper>
    <Avatar {...args} />
  </StoriesThemeWrapper>
)

export const Default = Template.bind({})
export const Custom = Template.bind({})
export const Icon = Template.bind({})

Default.args = {}
Custom.args = { children: 'User', size: 60, style: { backgroundColor: 'red' } }
Icon.args = {
  children: <DashboardOutlinedIcon />,
  style: { backgroundColor: 'yellowgreen' },
  size: 40,
}
