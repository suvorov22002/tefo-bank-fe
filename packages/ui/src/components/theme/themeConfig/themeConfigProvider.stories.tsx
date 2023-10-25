import { ComponentStory, Meta } from '@storybook/react'

import { Button } from '../../button'
import { disableArgTypesTableControl } from '../../../__storybook__'
import { ThemeConfigProvider, ThemeConfigProviderProps } from './themeConfigProvider'

export default {
  title: 'ThemeConfigProvider',
  component: ThemeConfigProvider,
  argTypes: {
    direction: {
      table: {
        defaultValue: { summary: 'ltr' },
      },
    },
    theme: {
      description: 'Set theme. To generate theme visit https://ant.design/theme-editor',
    },
    locale: disableArgTypesTableControl,
    iconPrefixCls: {
      table: {
        defaultValue: { summary: 'anticon' },
      },
    },
    prefixCls: {
      table: {
        defaultValue: { summary: 'ant' },
      },
    },
    getTargetContainer: {
      table: {
        defaultValue: { summary: '() => window' },
      },
    },
    getPopupContainer: {
      table: {
        defaultValue: { summary: '() => document.body' },
      },
    },
  },
} as Meta<ThemeConfigProviderProps>

// TODO: Add more components to ThemeConfigProvider after implementation
const Template: ComponentStory<typeof ThemeConfigProvider> = (args: ThemeConfigProviderProps) => (
  <ThemeConfigProvider {...args}>
    <Button type="primary">Primary</Button>
  </ThemeConfigProvider>
)

export const Theme = Template.bind({})

Theme.args = {}
