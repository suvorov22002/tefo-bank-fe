import { queryClient, useMutation } from 'ui'

import * as dictionariesService from '../service'
import { CreateUserDictionaryRequestData } from '../types'
import { DictionariesCacheKeys } from '../consts'

export const useUserDictionary = () => {
  const createUserDictionaryAction = useMutation({
    mutationFn: (data: CreateUserDictionaryRequestData) =>
      dictionariesService.createUserDictionary(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [DictionariesCacheKeys.UserDictionaries] }),
  })

  return {
    createUserDictionaryAction,
  }
}
