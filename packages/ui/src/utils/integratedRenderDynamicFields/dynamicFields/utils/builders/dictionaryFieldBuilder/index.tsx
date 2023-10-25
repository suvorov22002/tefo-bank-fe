import { useEffect, useState } from 'react'

import { DynamicFieldsLabel } from '../../../components'
import { validationBuilder } from '../validationBuilder'
import {
  DynamicDictionaryFieldProps,
  DynamicField,
  DynamicFieldApiClient,
  Field,
} from '../../../../types'
import { SelectField, SelectFieldProps } from '../../../../../../components'

interface DataItem {
  name: string
  code: string
}

export const DictionaryFieldDataWrapper = ({
  apiClient,
  dataUrl,
  ...componentProps
}: SelectFieldProps & { apiClient: DynamicFieldApiClient; dataUrl: string }) => {
  const [data, setData] = useState<DataItem[]>([])

  useEffect(() => {
    apiClient.get<DataItem[]>(dataUrl).then(res => setData(res.body))
  }, [dataUrl, apiClient])

  return (
    <SelectField
      {...componentProps}
      options={data.map(dataItem => ({ label: dataItem.name, value: dataItem.code }))}
    />
  )
}

export const dictionaryFieldBuilder = (
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
  }: DynamicField<DynamicDictionaryFieldProps>,
  apiClient: DynamicFieldApiClient
): Field<SelectFieldProps, DynamicDictionaryFieldProps> & {
  apiClient: DynamicFieldApiClient
  dataUrl: string
} => {
  return {
    Component: DictionaryFieldDataWrapper,
    key: code,
    apiClient,
    dataUrl: properties.url,
    name: code,
    required,
    label: <DynamicFieldsLabel label={label} tooltip={tooltip} />,
    group: groupCode,
    placeholder: placeholder || undefined,
    help: helpText,
    properties,
    validate: validationBuilder(validation?.rules),
  }
}
