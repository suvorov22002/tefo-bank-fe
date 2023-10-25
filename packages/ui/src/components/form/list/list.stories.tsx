import { ComponentStory, Meta } from '@storybook/react'

import { formItemCategory } from '../__storybook__'
import { List, ListProps } from './list'
import { StoriesThemeWrapper, disableArgTypesTableControl } from '../../../__storybook__'

export default {
  title: 'List',
  component: List,
  argTypes: {
    allowClear: {
      description: 'Show clear button',
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    autoClearSearchValue: {
      description:
        'Whether the current search will be cleared on selecting an item. Only applies when mode is set to multiple or tags',
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    autoFocus: {
      description: 'Get focus by default',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    bordered: {
      description: 'Whether has border style',
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    clearIcon: {
      description: ' The custom clear icon',
    },
    defaultActiveFirstOption: {
      description: 'Whether active first option by default',
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    defaultOpen: {
      description: 'Initial open state of dropdown',
    },
    defaultValue: {
      description: 'Initial selected option',
    },
    disabled: {
      description: 'Whether disabled select',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    popupClassName: {
      description: 'The className of dropdown menu',
    },
    dropdownMatchSelectWidth: {
      description:
        'Determine whether the dropdown menu and the select input are the same width. Default set min-width same as input. Will ignore when value less than select width. false will disable virtual scroll',
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    dropdownRender: {
      description: 'Customize dropdown content',
    },
    dropdownStyle: {
      description: 'The style of dropdown menu',
    },
    fieldNames: {
      description: 'Customize node label, value, options field name',
      table: {
        defaultValue: {
          summary: '{ label: `label`, value: `value`, options: `options` }',
        },
      },
    },
    filterOption: {
      description:
        'If true, filter options by input, if function, filter options against it. The function will receive two arguments, inputValue and option, if the function returns true, the option will be included in the filtered set; Otherwise, it will be excluded',
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    filterSort: {
      description: "Sort function for search options sorting, see Array.sort's compareFunction",
    },
    getPopupContainer: {
      description:
        'Parent Node which the selector should be rendered to. Default to body. When position issues happen, try to modify it into scrollable content and position it relative. Example',
      table: {
        defaultValue: {
          summary: '() => document.body',
        },
      },
    },
    labelInValue: {
      description:
        'Whether to embed label in value, turn the format of value from string to { value: string, label: ReactNode }',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    listHeight: {
      description: 'Config popup height',
      table: {
        defaultValue: {
          summary: 256,
        },
      },
    },
    loading: {
      description: 'Indicate loading state',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    maxTagCount: {
      description: 'Max tag count to show. responsive will cost render performance',
    },
    maxTagPlaceholder: {
      description: 'Placeholder for not showing tags',
    },
    maxTagTextLength: {
      description: 'Max tag text length to show',
    },
    menuItemSelectedIcon: {
      description: 'The custom menuItemSelected icon with multiple options',
    },
    mode: {
      description: 'Set mode of Select',
    },
    notFoundContent: {
      description: 'Specify content to show when no result matches',
      table: {
        defaultValue: {
          summary: 'Not Found',
        },
      },
    },
    open: {
      description: 'Controlled open state of dropdown',
    },
    optionFilterProp: {
      description:
        'Which prop value of option will be used for filter if filterOption is true. If options is set, it should be set to label',
      table: {
        defaultValue: {
          summary: 'value',
        },
      },
    },
    optionLabelProp: {
      description: 'Which prop value of option will render as content of select. Example ',
      table: {
        defaultValue: {
          summary: 'children',
        },
      },
    },
    options: {
      description: 'Select options. Will get better perf than jsx definition',
    },
    placeholder: {
      description: 'Placeholder of select',
    },
    placement: {
      description: 'The position where the selection box pops up',
      table: {
        defaultValue: {
          summary: 'bottomLeft',
        },
      },
    },
    removeIcon: {
      description: 'The custom remove icon',
    },
    searchValue: {
      description: 'The current input "search" text',
    },
    showArrow: {
      description: 'Whether to show the drop-down arrow',
      table: {
        defaultValue: {
          summary: 'true(for single select), false(for multiple select)',
        },
      },
    },
    showSearch: {
      description: 'Whether select is searchable',
      table: {
        defaultValue: {
          summary: 'single: false, multiple: true',
        },
      },
    },
    size: {
      description: 'Size of Select input',
      table: {
        defaultValue: {
          summary: '"middle"',
        },
      },
    },
    status: {
      description: 'Set validation status',
    },
    suffixIcon: {
      description: 'The custom suffix icon',
    },
    tagRender: {
      description: 'Customize tag render, only applies when mode is set to multiple or tags',
    },
    tokenSeparators: {
      description: 'Separator used to tokenize, only applies when mode="tags"',
    },
    value: {
      description: 'Current selected option (considered as a immutable array)',
    },
    virtual: {
      description: 'Disable virtual scroll when set to false',
      table: {
        deafultValue: {
          summary: true,
        },
      },
    },
    onBlur: {
      description: 'Called when blur',
      ...disableArgTypesTableControl,
    },
    onChange: {
      description: 'Called when select an option or input value change',
      ...disableArgTypesTableControl,
    },
    onClear: {
      description: 'Called when clear',
      ...disableArgTypesTableControl,
    },
    onDeselect: {
      description:
        "Called when an option is deselected, param is the selected option's value. Only called for multiple or tags, effective in multiple or tags mode only",
      ...disableArgTypesTableControl,
    },
    onDropdownVisibleChange: {
      description: 'Called when dropdown open',
      ...disableArgTypesTableControl,
    },
    onFocus: {
      description: 'Called when focus',
      ...disableArgTypesTableControl,
    },
    onInputKeyDown: {
      description: 'Called when key pressed',
      ...disableArgTypesTableControl,
    },
    onMouseEnter: {
      description: 'Called when mouse enter',
      ...disableArgTypesTableControl,
    },
    onMouseLeave: {
      description: 'Called when mouse leave',
      ...disableArgTypesTableControl,
    },
    onPopupScroll: {
      description: 'Called when dropdown scrolls',
      ...disableArgTypesTableControl,
    },
    onSearch: {
      description: 'Callback function that is fired when input changed',
      ...disableArgTypesTableControl,
    },
    onSelect: {
      description:
        "Called when an option is selected, the params are option's value (or key) and option instance",
      ...disableArgTypesTableControl,
    },
    ...formItemCategory,
  },
} as Meta<ListProps>

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

const Template: ComponentStory<typeof List> = (args: ListProps) => (
  <StoriesThemeWrapper>
    <List {...args} />
  </StoriesThemeWrapper>
)

export const Default = Template.bind({})
export const Disabled = Template.bind({})
export const WithClearButton = Template.bind({})

Default.args = {
  options,
  addNewItemButtonText: 'Add new Item',
}

Disabled.args = {
  disabled: true,
  addNewItemButtonText: 'Add new Item',
}

WithClearButton.args = {
  options,
  addNewItemButtonText: 'Add new Item',
  allowClear: true,
}
