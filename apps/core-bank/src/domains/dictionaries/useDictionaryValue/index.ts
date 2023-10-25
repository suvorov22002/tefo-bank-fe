import { queryClient, useMutation, useQuery } from 'ui'

import * as dictionariesService from '../service'
import { DictionariesCacheKeys } from '../consts'
import { CreateDictionaryValueRequestData, Dictionary, DictionaryValue } from '../types'

export const useDictionaryValue = (
  dictionaryId: Dictionary['id'],
  valueId?: DictionaryValue['id']
) => {
  const getDictionaryValue = useQuery({
    queryKey: [DictionariesCacheKeys.DictionaryValue, valueId],
    queryFn: () => dictionariesService.getDictionaryValue(valueId as number),
    enabled: !!valueId,
  })

  const createDictionaryValueAction = useMutation({
    mutationFn: (data: CreateDictionaryValueRequestData) =>
      dictionariesService.createDictionaryValue(dictionaryId, data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [DictionariesCacheKeys.DictionaryValues, dictionaryId],
      }),
  })

  const editDictionaryValue = useMutation({
    mutationFn: dictionariesService.editDictionaryValue,
    onSuccess: (data: DictionaryValue) => {
      queryClient.setQueryData<DictionaryValue>(
        [DictionariesCacheKeys.DictionaryValue, valueId],
        cachedData => ({ ...cachedData, ...data })
      )
      queryClient.invalidateQueries({
        queryKey: [DictionariesCacheKeys.DictionaryValues, dictionaryId],
      })
    },
  })

  return {
    createDictionaryValueAction,
    getDictionaryValue,
    editDictionaryValue,
  }
}
