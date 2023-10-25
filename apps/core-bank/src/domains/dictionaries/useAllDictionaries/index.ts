import { useQuery } from 'ui'

import * as dictionariesService from '../service'
import { DictionariesCacheKeys } from '../consts'

export const useAllDictionaries = ({
  shouldQueryAllDictionaries = true,
}: {
  shouldQueryAllDictionaries?: boolean
}) => {
  const getAllDictionaries = useQuery({
    queryFn: dictionariesService.getAllDictionaries,
    queryKey: [DictionariesCacheKeys.AllDictionaries],
    enabled: shouldQueryAllDictionaries,
  })

  return {
    getAllDictionaries,
  }
}
