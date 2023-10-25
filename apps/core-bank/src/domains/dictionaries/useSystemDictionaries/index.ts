import { useQuery } from 'ui'

import * as dictionariesService from '../service'
import { DictionariesCacheKeys } from '../consts'

export const useSystemDictionaries = ({ page, limit }: { page: number; limit: number }) => {
  const getSystemDictionaries = useQuery({
    queryKey: [DictionariesCacheKeys.SystemDictionaries, page, limit],
    queryFn: () => dictionariesService.getSystemDictionaries(page, limit),
  })

  return {
    getSystemDictionaries,
  }
}
