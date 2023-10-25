import { ComponentStory, Meta } from '@storybook/react'

import { formItemCategory } from '../__storybook__'
import {
  StoriesThemeWrapper,
  disableArgTypesTableControl,
  setArgTypesTextControl,
} from '../../../__storybook__'
import { TreeSelect, TreeSelectProps } from './treeSelect'

export default {
  title: 'TreeSelect',
  component: TreeSelect,
  argTypes: {
    allowClear: {
      description: 'Whether allow clear',
      table: { defaultValue: { summary: 'false' } },
    },
    autoClearSearchValue: {
      description: 'If auto clear search input value when multiple select is selected/deselected',
      table: { defaultValue: { summary: 'true' } },
    },
    bordered: {
      description: 'Whether has border style',
      table: { defaultValue: { summary: 'true' } },
    },
    defaultValue: {
      description: 'To set the initial selected treeNode(s)',
      table: { defaultValue: { summary: '-' } },
    },
    disabled: { description: 'Disabled or not', table: { defaultValue: { summary: 'false' } } },
    popupClassName: {
      description: 'The className of dropdown menu',
      table: { defaultValue: { summary: '-' } },
    },
    popupMatchSelectWidth: {
      description:
        'Determine whether the popup menu and the select input are the same width. Default set min-width same as input. Will ignore when value less than select width. false will disable virtual scroll',
      table: { defaultValue: { summary: 'true' } },
    },
    dropdownRender: {
      description: 'Customize dropdown content',
      table: { defaultValue: { summary: '-' } },
    },
    dropdownStyle: {
      description: 'To set the style of the dropdown menu',
      table: { defaultValue: { summary: '-' } },
    },
    fieldNames: {
      description: 'Customize node label, value, children field name',
      table: { defaultValue: { summary: '{ label: label, value: value, children: children }' } },
    },
    filterTreeNode: {
      description:
        'Whether to filter treeNodes by input value. The value of treeNodeFilterProp is used for filtering by default',
      table: { defaultValue: { summary: 'function' } },
    },
    getPopupContainer: {
      description:
        'To set the container of the dropdown menu. The default is to create a div element in body, you can reset it to the scrolling area and make a relative reposition. example',
      table: { defaultValue: { summary: '() => document.body' } },
    },
    labelInValue: {
      description:
        'Whether to embed label in value, turn the format of value from string to {value: string, label: ReactNode, halfChecked: string[]}',
      table: { defaultValue: { summary: 'false' } },
    },
    listHeight: { description: 'Config popup height', table: { defaultValue: { summary: '256' } } },
    loadData: {
      description:
        'Load data asynchronously. Will not load when filtering. Check FAQ for more info',
      table: { defaultValue: { summary: '-' } },
    },
    maxTagCount: {
      description: 'Max tag count to show. responsive will cost render performance',
      table: { defaultValue: { summary: '-' } },
    },
    maxTagPlaceholder: {
      description: 'Placeholder for not showing tags',
      table: { defaultValue: { summary: '-' } },
    },
    maxTagTextLength: {
      description: 'Max tag text length to show',
      table: { defaultValue: { summary: '-' } },
    },
    multiple: {
      description: 'Support multiple or not, will be true when enable treeCheckable',
      table: { defaultValue: { summary: 'false' } },
    },
    notFoundContent: {
      description: 'Specify content to show when no result matches',
      table: { defaultValue: { summary: 'Not Found' } },
    },
    placeholder: {
      ...setArgTypesTextControl,
      description: 'Placeholder of the select input',
      table: { defaultValue: { summary: '-' } },
    },
    placement: {
      description: 'The position where the selection box pops up',
      table: { defaultValue: { summary: 'bottomLeft' } },
    },
    searchValue: {
      description: 'Work with onSearch to make search value controlled',
      table: { defaultValue: { summary: '-' } },
    },
    showArrow: {
      description: 'Whether to show the suffixIcon',
      table: { defaultValue: { summary: 'true' } },
    },
    showCheckedStrategy: {
      description:
        'The way show selected item in box when treeCheckable set. Default: just show child nodes. TreeSelect.SHOW_ALL: show all checked treeNodes (include parent treeNode). TreeSelect.SHOW_PARENT: show checked treeNodes (just show parent treeNode)',
      table: { defaultValue: { summary: 'TreeSelect.SHOW_CHILD' } },
    },
    showSearch: {
      description: 'Support search or not',
      table: { defaultValue: { summary: 'single: false | multiple: true' } },
    },
    size: {
      description: 'To set the size of the select input',
      table: { defaultValue: { summary: '-' } },
    },
    status: { description: 'Set validation status', table: { defaultValue: { summary: '-' } } },
    suffixIcon: {
      description:
        'The custom suffix icon,you must set showArrow to true manually in multiple selection mode',
      table: { defaultValue: { summary: '-' } },
    },
    switcherIcon: {
      description: 'Customize collapse/expand icon of tree node',
      table: { defaultValue: { summary: '-' } },
    },
    tagRender: {
      description: 'Customize tag render when multiple',
      table: { defaultValue: { summary: '-' } },
    },
    treeCheckable: {
      description: 'Whether to show checkbox on the treeNodes',
      table: { defaultValue: { summary: 'false' } },
    },
    treeCheckStrictly: {
      description:
        'Whether to check nodes precisely (in the checkable mode), means parent and child nodes are not associated, and it will make labelInValue be true',
      table: { defaultValue: { summary: 'false' } },
    },
    treeData: {
      description:
        'Data of the treeNodes, manual construction work is no longer needed if this property has been set(ensure the Uniqueness of each value)',
      table: { defaultValue: { summary: '[]' } },
    },
    treeDataSimpleMode: {
      ...disableArgTypesTableControl,
      description:
        "Enable simple mode of treeData. Changes the treeData schema to: [{id:1, pId:0, value:'1', title:'test1',...},...] where pId is parent node's id). It is possible to replace the default id and pId keys by providing object to treeDataSimpleMode",
      table: { defaultValue: { summary: 'false' } },
    },
    treeDefaultExpandAll: {
      description: 'Whether to expand all treeNodes by default',
      table: { defaultValue: { summary: 'false' } },
    },
    treeDefaultExpandedKeys: {
      description: 'Default expanded treeNodes',
      table: { defaultValue: { summary: '-' } },
    },
    treeExpandAction: {
      description: 'Tree title open logic when click, optional: false | click | doubleClick',
      table: { defaultValue: { summary: 'false' } },
    },
    treeExpandedKeys: {
      description: 'Set expanded keys',
      table: { defaultValue: { summary: '-' } },
    },
    treeIcon: {
      description:
        "Shows the icon before a TreeNode's title. There is no default style; you must set a custom style for it if set to true",
      table: { defaultValue: { summary: 'false' } },
    },
    treeLoadedKeys: {
      description: '(Controlled) Set loaded tree nodes, work with loadData only',
      table: { defaultValue: { summary: '[]' } },
    },
    treeLine: {
      description: 'Show the line. Ref Tree - showLine',
      table: { defaultValue: { summary: 'false' } },
    },
    treeNodeFilterProp: {
      description: 'Will be used for filtering if filterTreeNode returns true',
      table: { defaultValue: { summary: 'value' } },
    },
    treeNodeLabelProp: {
      description: 'Will render as content of select',
      table: { defaultValue: { summary: 'title' } },
    },
    value: {
      description: 'To set the current selected treeNode(s)',
      table: { defaultValue: { summary: '-' } },
    },
    virtual: {
      description: 'Disable virtual scroll when set to false',
      table: { defaultValue: { summary: 'true' } },
    },
    onChange: {
      ...disableArgTypesTableControl,
      description:
        'A callback function, can be executed when selected treeNodes or input value change',
      table: { defaultValue: { summary: '-' } },
    },
    onDropdownVisibleChange: {
      ...disableArgTypesTableControl,
      description: 'Called when dropdown open',
      table: { defaultValue: { summary: '-' } },
    },
    onSearch: {
      ...disableArgTypesTableControl,
      description: 'A callback function, can be executed when the search input changes',
      table: { defaultValue: { summary: '-' } },
    },
    onSelect: {
      ...disableArgTypesTableControl,
      description: 'A callback function, can be executed when you select a treeNode',
      table: { defaultValue: { summary: '-' } },
    },
    onTreeExpand: {
      ...disableArgTypesTableControl,
      description: 'A callback function, can be executed when treeNode expanded',
      table: { defaultValue: { summary: '-' } },
    },
    onBlur: {
      ...disableArgTypesTableControl,
    },
    ...formItemCategory,
  },
} as Meta<TreeSelectProps>

const Template: ComponentStory<typeof TreeSelect> = (args: TreeSelectProps) => (
  <StoriesThemeWrapper>
    <TreeSelect {...args} />
  </StoriesThemeWrapper>
)

const treeData = [
  {
    value: 'parent 1',
    title: 'parent 1',
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0',
        children: [
          {
            value: 'leaf1',
            title: 'leaf1',
          },
          {
            value: 'leaf2',
            title: 'leaf2',
          },
        ],
      },
      {
        value: 'parent 1-1',
        title: 'parent 1-1',
        children: [
          {
            value: 'leaf3',
            title: <b style={{ color: '#08c' }}>leaf3</b>,
          },
        ],
      },
    ],
  },
]

export const Default = Template.bind({})
export const Multiple = Template.bind({})
export const Disabled = Template.bind({})
export const WithClearButton = Template.bind({})
export const Checkable = Template.bind({})

Default.args = {
  treeData,
}

Multiple.args = {
  treeData,
  multiple: true,
  defaultValue: ['leaf 1', 'leaf 2'],
}

Disabled.args = {
  treeData,
  disabled: true,
}

WithClearButton.args = {
  treeData,
  allowClear: true,
}

Checkable.args = {
  treeData,
  treeCheckable: true,
  showCheckedStrategy: 'SHOW_PARENT',
}
