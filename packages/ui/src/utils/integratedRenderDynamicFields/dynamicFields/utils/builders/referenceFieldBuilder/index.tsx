import { useEffect, useState } from 'react'

import { DynamicFieldsLabel } from '../../../components'
import { validationBuilder } from '../validationBuilder'
import {
  DynamicField,
  DynamicFieldApiClient,
  DynamicReferenceFieldProps,
  Field,
} from '../../../../types'
import { SelectField, SelectFieldProps } from '../../../../../../components'

type DataItem = Record<
  DynamicReferenceFieldProps['keyField'] | DynamicReferenceFieldProps['valueField'],
  string
> &
  Record<string, unknown>

type ReferenceFieldDataWrapperProps = {
  apiClient: DynamicFieldApiClient
  properties: DynamicReferenceFieldProps
}

export const ReferenceFieldDataWrapper = ({
  apiClient,
  properties,
  ...componentProps
}: SelectFieldProps & ReferenceFieldDataWrapperProps) => {
  const [data, setData] = useState<DataItem[]>([])
  const { url, valueField, keyField } = properties

  useEffect(() => {
    apiClient.get<DataItem[]>(url).then(res => setData(res.body))
  }, [url, apiClient])

  return (
    <SelectField
      {...componentProps}
      options={data.map(dataItem => ({ label: dataItem[keyField], value: dataItem[valueField] }))}
    />
  )
}

export const referenceFieldBuilder = (
  {
    code,
    required,
    label,
    groupCode,
    placeholder,
    tooltip,
    helpText,
    validation,
    properties,
  }: DynamicField<DynamicReferenceFieldProps>,
  apiClient: DynamicFieldApiClient
): Field<SelectFieldProps, DynamicReferenceFieldProps> & ReferenceFieldDataWrapperProps => {
  return {
    Component: ReferenceFieldDataWrapper,
    key: code,
    apiClient,
    properties,
    name: code,
    required,
    label: <DynamicFieldsLabel label={label} tooltip={tooltip} />,
    group: groupCode,
    placeholder: placeholder || undefined,
    help: helpText,
    validate: validationBuilder(validation?.rules),
  }
}
