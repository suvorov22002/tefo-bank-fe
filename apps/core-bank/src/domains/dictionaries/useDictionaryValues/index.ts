import { useQuery } from 'ui'

import * as dictionariesService from '../service'
import { DictionariesCacheKeys } from '../consts'
import { Dictionary } from '../types'

export const useDictionaryValues = ({
  dictionaryId,
  page,
  limit,
}: {
  dictionaryId: Dictionary['id']
  page: number
  limit: number
}) => {
  const getDictionaryValues = useQuery({
    queryKey: [DictionariesCacheKeys.DictionaryValues, dictionaryId, page, limit],
    queryFn: () => dictionariesService.getDictionaryValues(dictionaryId, page, limit),
    enabled: !!dictionaryId,
  })

  return {
    getDictionaryValues,
  }
}
