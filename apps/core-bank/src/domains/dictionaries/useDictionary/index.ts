import { useQuery } from 'ui'

import * as dictionariesService from '../service'
import { DictionariesCacheKeys } from '../consts'
import { Dictionary } from '../types'

export const useDictionary = (dictionaryId: Dictionary['id']) => {
  const getDictionary = useQuery({
    queryKey: [DictionariesCacheKeys.Dictionary, dictionaryId],
    queryFn: () => dictionariesService.getDictionary(dictionaryId),
    enabled: !!dictionaryId,
  })

  return {
    getDictionary,
  }
}
