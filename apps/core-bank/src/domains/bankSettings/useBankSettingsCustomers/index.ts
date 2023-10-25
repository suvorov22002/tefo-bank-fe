import { queryClient, useMutation, useQuery } from 'ui'

import * as bankSettingsService from '../service'
import { BankSettingsCacheKeys } from '../consts'
import { BankSettingsCustomers } from '../types'

export const useBankSettingsCustomers = () => {
  const getBankSettingsCustomers = useQuery({
    queryKey: [BankSettingsCacheKeys.BankSettingsCustomers],
    queryFn: bankSettingsService.getBankSettingsCustomers,
  })

  const editBankSettingsCustomers = useMutation({
    mutationFn: bankSettingsService.editBankSettingsCustomers,
    onSuccess(data) {
      queryClient.setQueryData<BankSettingsCustomers>(
        [BankSettingsCacheKeys.BankSettingsCustomers],
        cachedData => ({
          ...cachedData,
          ...data,
        })
      )
    },
  })

  return {
    getBankSettingsCustomers,
    editBankSettingsCustomers,
  }
}
