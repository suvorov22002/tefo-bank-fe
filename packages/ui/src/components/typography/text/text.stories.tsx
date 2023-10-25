import { ComponentStory, Meta } from '@storybook/react'

import {
  StoriesThemeWrapper,
  disableArgTypesTableControl,
  setArgTypesBooleanControl,
} from '../../../__storybook__'
import { Text, TextProps } from './text'

export default {
  title: 'Text',
  component: Text,
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
        "Display ellipsis when text overflows, can't configure expandable、rows and onExpand by using object. Diff with Typography.Paragraph, Text do not have 100% width style which means it will fix width on the first ellipsis. If you want to have responsive ellipsis, please set width manually",
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    keyboard: {
      description: 'Keyboard style',
      table: {
        defaultValue: {
          summary: 'false',
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
      ...disableArgTypesTableControl,
      description: 'Set the handler to handle click event',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    strong: {
      description: 'Bold style',
      table: {
        defaultValue: {
          summary: 'false',
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
} as Meta<TextProps>

const Template: ComponentStory<typeof Text> = (args: TextProps) => (
  <StoriesThemeWrapper>
    <Text {...args} />
  </StoriesThemeWrapper>
)

export const Default = Template.bind({})
export const Code = Template.bind({})
export const Delete = Template.bind({})
export const Mark = Template.bind({})
export const Strong = Template.bind({})
export const Italic = Template.bind({})
export const Keyboard = Template.bind({})
export const Danger = Template.bind({})
export const Success = Template.bind({})
export const Warning = Template.bind({})
export const Secondary = Template.bind({})
export const Disabled = Template.bind({})

Code.args = {
  code: true,
}

Delete.args = {
  delete: true,
}

Mark.args = {
  mark: true,
}

Strong.args = {
  strong: true,
}

Italic.args = {
  italic: true,
}

Keyboard.args = {
  keyboard: true,
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
