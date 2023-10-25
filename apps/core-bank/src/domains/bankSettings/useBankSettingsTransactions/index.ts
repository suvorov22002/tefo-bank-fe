import { queryClient, useMutation, useQuery } from 'ui'

import * as bankSettingsService from '../service'
import { BankSettingsCacheKeys } from '../consts'
import { BankSettingsTransactions } from '../types'

export const useBankSettingsTransactions = () => {
  const getBankSettingsTransactions = useQuery({
    queryKey: [BankSettingsCacheKeys.BankSettingsTransactions],
    queryFn: bankSettingsService.getBankSettingsTransactions,
  })

  const editBankSettingsTransactions = useMutation({
    mutationFn: bankSettingsService.editBankSettingsTransactions,
    onSuccess(data) {
      queryClient.setQueryData<BankSettingsTransactions>(
        [BankSettingsCacheKeys.BankSettingsTransactions],
        cachedData => ({
          ...cachedData,
          ...data,
        })
      )
    },
  })

  return {
    getBankSettingsTransactions,
    editBankSettingsTransactions,
  }
}
