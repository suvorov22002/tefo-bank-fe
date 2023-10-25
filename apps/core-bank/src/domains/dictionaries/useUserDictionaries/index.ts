import { useQuery } from 'ui'

import * as dictionariesService from '../service'
import { DictionariesCacheKeys } from '../consts'

export const useUserDictionaries = ({ page, limit }: { page: number; limit: number }) => {
  const getUserDictionaries = useQuery({
    queryKey: [DictionariesCacheKeys.UserDictionaries, page, limit],
    queryFn: () => dictionariesService.getUserDictionaries(page, limit),
  })

  return {
    getUserDictionaries,
  }
}
