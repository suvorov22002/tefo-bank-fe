import { ComponentProps, Key } from 'react'
import { FieldHookConfig, useField } from 'formik'

import { withInputHelpers } from '../withInputHelpers'
import { Table, TableProps } from '../../table'

export const TreeTable = withInputHelpers<TableProps<Record<string, unknown>>>(Table)

export interface TreeTableProps extends ComponentProps<typeof TreeTable> {}

export type TreeTableFieldProps = TreeTableProps & FieldHookConfig<Key[]>

export const TreeTableField = (props: TreeTableFieldProps) => {
  const { name, rowSelection, ...componentProps } = props

  const fieldProps: FieldHookConfig<Key[]> = { name }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, _meta, helpers] = useField(fieldProps)

  const fieldRowSelection = {
    onChange: (keys: Key[]) => helpers.setValue(keys),
    selectedRowKeys: field.value,
    checkStrictly: false,
    ...rowSelection,
  }

  return <TreeTable {...componentProps} rowSelection={fieldRowSelection} />
}
