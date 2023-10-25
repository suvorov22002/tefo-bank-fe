import { queryClient, useMutation, useQuery } from 'ui'

import * as bankSettingsService from '../service'
import { BankSettingsCacheKeys } from '../consts'
import { BankSettingsTime } from '../types'

export const useBankSettingsTime = () => {
  const getBankSettingsTime = useQuery({
    queryKey: [BankSettingsCacheKeys.BankSettingsTime],
    queryFn: bankSettingsService.getBankSettingsTime,
  })

  const editBankSettingsTime = useMutation({
    mutationFn: bankSettingsService.editBankSettingsTime,
    onSuccess(data) {
      queryClient.setQueryData<BankSettingsTime>(
        [BankSettingsCacheKeys.BankSettingsTime],
        cachedData => ({
          ...cachedData,
          ...data,
        })
      )
    },
  })

  return {
    getBankSettingsTime,
    editBankSettingsTime,
  }
}
