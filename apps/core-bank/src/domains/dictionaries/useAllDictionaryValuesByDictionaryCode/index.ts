import { useQuery } from 'ui'

import * as dictionariesService from '../service'
import { DictionariesCacheKeys } from '../consts'
import { Dictionary } from '../types'

export const useAllDictionaryValuesByDictionaryCode = ({
  dictionaryCode,
  shouldQueryAllDictionaryValuesByDictionaryCode,
}: {
  dictionaryCode: Dictionary['code']
  shouldQueryAllDictionaryValuesByDictionaryCode?: boolean
}) => {
  const getAllDictionaryValuesByDictionaryCode = useQuery({
    queryKey: [DictionariesCacheKeys.AllDictionaryValuesByDictionaryCode, dictionaryCode],
    queryFn: () => dictionariesService.getAllDictionaryValuesByDictionaryCode(dictionaryCode),
    enabled: !!dictionaryCode && shouldQueryAllDictionaryValuesByDictionaryCode,
  })

  return {
    getAllDictionaryValuesByDictionaryCode,
  }
}
