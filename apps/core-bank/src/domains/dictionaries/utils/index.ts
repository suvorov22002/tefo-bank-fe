import { DictionaryValue } from '@/domains/dictionaries'

export const getSelectOptionsFromDictionaryValues = (values: DictionaryValue[] | undefined) =>
  values?.map(el => ({
    label: el.name,
    value: el.id,
  })) || []
