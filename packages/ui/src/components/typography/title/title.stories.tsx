import { ComponentStory, Meta } from '@storybook/react'
import {
  StoriesThemeWrapper,
  disableArgTypesTableControl,
  setArgTypesBooleanControl,
} from '../../../__storybook__'

import { Title, TitleProps } from './title'

export default {
  title: 'Title',
  component: Title,
  args: {
    children: 'Example text',
  },
  argTypes: {
    code: {
      description: 'Code style',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    copyable: {
      description: 'Whether to be copyable, customize it via setting an object',
      ...setArgTypesBooleanControl,
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    delete: {
      description: 'Deleted line style',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    disabled: {
      description: 'Disabled content',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    editable: {
      description: 'If editable. Can control edit state when is object',
      ...setArgTypesBooleanControl,
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    ellipsis: {
      description:
        'Display ellipsis when text overflows, can configure rows and expandable by using object',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    level: {
      description: 'Set content importance. Match with h1, h2, h3, h4, h5',
      table: {
        defaultValue: {
          summary: '1',
        },
      },
    },
    mark: {
      description: 'Marked style',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    onClick: {
      description: 'Set the handler to handle click event',
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    italic: {
      description: 'Italic style',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    type: {
      description: 'Content type',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    underline: {
      description: 'Underlined style',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
} as Meta<TitleProps>

const Template: ComponentStory<typeof Title> = (args: TitleProps) => (
  <StoriesThemeWrapper>
    <Title {...args} />
  </StoriesThemeWrapper>
)

export const H_1 = Template.bind({})
export const H_2 = Template.bind({})
export const H3 = Template.bind({})
export const H4 = Template.bind({})
export const H5 = Template.bind({})
export const Code = Template.bind({})
export const Delete = Template.bind({})
export const Mark = Template.bind({})
export const Italic = Template.bind({})
export const Danger = Template.bind({})
export const Success = Template.bind({})
export const Warning = Template.bind({})
export const Secondary = Template.bind({})
export const Disabled = Template.bind({})

H_1.args = {
  level: 1,
}

H_2.args = {
  level: 2,
}

H3.args = {
  level: 3,
}

H4.args = {
  level: 4,
}

H5.args = {
  level: 5,
}

Code.args = {
  code: true,
}

Delete.args = {
  delete: true,
}

Mark.args = {
  mark: true,
}

Italic.args = {
  italic: true,
}

Danger.args = {
  type: 'danger',
}

Success.args = {
  type: 'success',
}

Warning.args = {
  type: 'warning',
}

Secondary.args = {
  type: 'secondary',
}

Disabled.args = {
  disabled: true,
}
