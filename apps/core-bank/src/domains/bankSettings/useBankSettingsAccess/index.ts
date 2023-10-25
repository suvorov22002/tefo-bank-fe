import { queryClient, useMutation, useQuery } from 'ui'

import * as bankSettingsService from '../service'
import { BankSettingsAccess } from '../types'
import { BankSettingsCacheKeys } from '../consts'

export const useBankSettingsAccess = () => {
  const getBankSettingsAccess = useQuery({
    queryKey: [BankSettingsCacheKeys.BankSettingsAccess],
    queryFn: bankSettingsService.getBankSettingsAccess,
  })

  const editBankSettingsAccess = useMutation({
    mutationFn: bankSettingsService.editBankSettingsAccess,
    onSuccess(data) {
      queryClient.setQueryData<BankSettingsAccess>(
        [BankSettingsCacheKeys.BankSettingsAccess],
        cachedData => ({
          ...cachedData,
          ...data,
        })
      )
    },
  })

  return {
    getBankSettingsAccess,
    editBankSettingsAccess,
  }
}
