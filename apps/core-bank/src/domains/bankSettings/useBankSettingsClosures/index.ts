import { queryClient, useMutation, useQuery } from 'ui'

import * as bankSettingsService from '../service'
import { BankSettingsCacheKeys } from '../consts'
import { BankSettingsClosures } from '../types'

export const useBankSettingsClosures = () => {
  const getBankSettingsClosures = useQuery({
    queryKey: [BankSettingsCacheKeys.BankSettingsClosures],
    queryFn: bankSettingsService.getBankSettingsClosures,
  })

  const editBankSettingsClosures = useMutation({
    mutationFn: bankSettingsService.editBankSettingsClosures,
    onSuccess(data) {
      queryClient.setQueryData<BankSettingsClosures>(
        [BankSettingsCacheKeys.BankSettingsClosures],
        cachedData => ({
          ...cachedData,
          ...data,
        })
      )
    },
  })

  return {
    getBankSettingsClosures,
    editBankSettingsClosures,
  }
}
