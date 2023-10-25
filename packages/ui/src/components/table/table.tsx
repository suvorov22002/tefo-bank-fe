import {
  Table as AntdTable,
  TableColumnsType as AntdTableColumnsType,
  TablePaginationConfig as AntdTablePaginationConfig,
  TableProps as AntdTableProps,
} from 'antd'

import { classes } from '../../utils'
import './styles.scss'

export enum TableColumnsAlignOptions {
  Center = 'center',
  Left = 'left',
  Right = 'right',
}

export type TableColumnsType<RecordType = unknown> = AntdTableColumnsType<RecordType>

export type TablePaginationConfig = AntdTablePaginationConfig

export interface TableProps<RecordType> {
  components?: AntdTableProps<RecordType>['components']
  dataSource?: AntdTableProps<RecordType>['dataSource']
  columns?: AntdTableProps<RecordType>['columns']
  pagination?: AntdTableProps<RecordType>['pagination']
  loading?: AntdTableProps<RecordType>['loading']
  bordered?: AntdTableProps<RecordType>['bordered']
  expandable?: AntdTableProps<RecordType>['expandable']
  locale?: AntdTableProps<RecordType>['locale']
  size?: AntdTableProps<RecordType>['size']
  rowSelection?: AntdTableProps<RecordType>['rowSelection']
  scroll?: AntdTableProps<RecordType>['scroll']
  sortDirections?: AntdTableProps<RecordType>['sortDirections']
  showSorterTooltip?: AntdTableProps<RecordType>['showSorterTooltip']
  dropdownPrefixCls?: AntdTableProps<RecordType>['dropdownPrefixCls']
  rootClassName?: AntdTableProps<RecordType>['rootClassName']
  rowClassName?: AntdTableProps<RecordType>['rowClassName']
  rowKey?: AntdTableProps<RecordType>['rowKey']
  showHeader?: AntdTableProps<RecordType>['showHeader']
  sticky?: AntdTableProps<RecordType>['sticky']
  tableLayout?: AntdTableProps<RecordType>['tableLayout']
  className?: AntdTableProps<RecordType>['className']
  children?: AntdTableProps<RecordType>['children']
  title?: AntdTableProps<RecordType>['title']
  footer?: AntdTableProps<RecordType>['footer']
  summary?: AntdTableProps<RecordType>['summary']
  onChange?: AntdTableProps<RecordType>['onChange']
  onHeaderRow?: AntdTableProps<RecordType>['onHeaderRow']
  onRow?: AntdTableProps<RecordType>['onRow']
  getPopupContainer?: AntdTableProps<RecordType>['getPopupContainer']
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ExtendedOnClickEvent extends React.MouseEvent<any, MouseEvent> {
  target: EventTarget & { localName: string; parentElement: HTMLElement; classList: DOMTokenList }
}

export const Table = <RecordType extends Record<string, unknown>>({
  rowClassName,
  className,
  onRow,
  pagination,
  ...rest
}: TableProps<RecordType>) => {
  const onRowClickableActions =
    onRow && rest?.dataSource && Object.getOwnPropertyNames(onRow(rest.dataSource[0]))

  const isOnRowClickableActions = ['onClick', 'onDoubleClick', 'onContextMenu'].some(
    el => onRowClickableActions?.includes(el)
  )

  const getRowProps: TableProps<RecordType>['onRow'] = onRow
    ? (...args) => {
        const onRowProps = onRow(...args)

        return {
          ...onRowProps,
          onClick: (e: ExtendedOnClickEvent) => {
            if (
              e.target.parentElement.localName !== 'td' &&
              e.target.parentElement.localName !== 'li' &&
              e.target.parentElement.localName !== 'ul' &&
              e.target.parentElement.localName !== 'button'
            ) {
              onRowProps.onClick && onRowProps.onClick(e)
            }
          },
        }
      }
    : undefined

  return (
    <AntdTable<RecordType>
      pagination={
        pagination !== false
          ? {
              position: ['bottomCenter'],
              showSizeChanger: true,
              ...pagination,
            }
          : false
      }
      className={classes('table', className)}
      rowClassName={classes({ ['table__row']: isOnRowClickableActions }, rowClassName)}
      {...rest}
      onRow={getRowProps}
    />
  )
}
