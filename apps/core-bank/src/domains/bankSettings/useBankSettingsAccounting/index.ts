import { queryClient, useMutation, useQuery } from 'ui'

import * as bankSettingsService from '../service'
import { BankSettingsAccounting } from '../types'
import { BankSettingsCacheKeys } from '../consts'

export const useBankSettingsAccounting = () => {
  const getBankSettingsAccounting = useQuery({
    queryKey: [BankSettingsCacheKeys.BankSettingsAccounting],
    queryFn: bankSettingsService.getBankSettingsAccounting,
  })

  const editBankSettingsAccounting = useMutation({
    mutationFn: bankSettingsService.editBankSettingsAccounting,
    onSuccess(data) {
      queryClient.setQueryData<BankSettingsAccounting>(
        [BankSettingsCacheKeys.BankSettingsAccounting],
        cachedData => ({
          ...cachedData,
          ...data,
        })
      )
    },
  })

  return {
    getBankSettingsAccounting,
    editBankSettingsAccounting,
  }
}
