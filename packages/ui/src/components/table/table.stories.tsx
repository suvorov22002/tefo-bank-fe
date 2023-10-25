import { ComponentStory, Meta } from '@storybook/react'

import { Button } from '../button'
import { Link } from '../typography'
import {
  StoriesThemeWrapper,
  disableArgTypesTableControl,
  setArgTypesBooleanControl,
} from '../../__storybook__'
import { Table, TableProps } from '../table'

export default {
  title: 'Table',
  component: Table,
  argTypes: {
    bordered: {
      description: 'Whether to show all table borders',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    columns: {
      description: 'Columns of table',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    components: {
      description: 'Override default table elements',
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    dataSource: {
      description: 'Data record array to be displayed',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    expandable: {
      description: 'Config expandable content',
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    footer: {
      description: 'Table footer renderer',
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    getPopupContainer: {
      description: 'The render container of dropdowns in table',
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: '() => TableHtmlElement',
        },
      },
    },
    loading: {
      description: 'Loading status of table',
      ...setArgTypesBooleanControl,
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    locale: {
      description: 'The i18n text including filter, sort, empty text, etc',
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: 'Default Value',
        },
      },
    },
    pagination: {
      description:
        'Config of pagination. You can ref table pagination config or full pagination document, hide it by setting it to false',
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    rowClassName: {
      description: "Row's className",
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    rowKey: {
      description: "Row's unique key, could be a string or function that returns a string",
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: 'key',
        },
      },
    },
    rowSelection: {
      description: 'Row selection config',
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    scroll: {
      description: 'Whether the table can be scrollable, config',
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    showHeader: {
      description: 'Whether to show table header',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    showSorterTooltip: {
      ...disableArgTypesTableControl,
      description:
        'The header show next sorter direction tooltip. It will be set as the property of Tooltip if its type is object',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    size: {
      description: 'Size of table',
      table: {
        defaultValue: {
          summary: 'large',
        },
      },
    },
    sortDirections: {
      description: 'Supported sort way, could be ascend, descend',
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: '[ascend, descend]',
        },
      },
    },
    sticky: {
      description: 'Set sticky header and scroll bar',
      ...setArgTypesBooleanControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    summary: {
      description: 'Summary content',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    tableLayout: {
      description: 'The table-layout attribute of table element',
      table: {
        defaultValue: {
          summary: '- | fixed when header/columns are fixed, or using column.ellipsis',
        },
      },
    },
    title: {
      description: 'Table title renderer',
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onChange: {
      description: 'Callback executed when pagination, filters or sorter is changed',
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onHeaderRow: {
      description: 'Set props on per header row',
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onRow: {
      description: 'Set props on per row',
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
  },
} as Meta<TableProps<Record<string, unknown>>>

const Template: ComponentStory<typeof Table> = (args: TableProps<Record<string, unknown>>) => (
  <StoriesThemeWrapper>
    <Table {...args} />
  </StoriesThemeWrapper>
)

const dataSource = [
  {
    key: '1',
    name: 'John',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'Leo',
    age: 42,
    address: '10 Downing Street',
  },
]

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
]

const getCustomTableDataSource = () => {
  const element = []

  for (let index = 0; index < 71; index++) {
    element.push({
      key: index,
      name: <Link>{`Name ${index}`}</Link>,
      age: index,
      address: `Long Address ${index}, Long Address ${index}, Long Address ${index}`,
      action: <Button type="link">...</Button>,
    })
  }

  return element
}

export const Default = Template.bind({})
export const Empty = Template.bind({})
export const Custom = Template.bind({})

Default.args = {
  columns,
  dataSource,
}
Empty.args = {}
Custom.args = {
  columns: [
    ...columns,
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '64px',
    },
  ],
  dataSource: getCustomTableDataSource(),
  bordered: true,
  pagination: {
    position: ['bottomRight'],
    hideOnSinglePage: true,
    showSizeChanger: false,
  },
}
